import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../../../../shared/infrastructure/prisma.service';
import { comparePasswords } from '../../../config/sessions';
import { UpdatePasswordDto } from './update-password.dto';
import { hashPassword } from '../../../../../shared/utils/hashPassword';
import { Session } from '../../../../../types/session';
import { AppType, LogType } from '../../../../logs/domain/entities/log.entity';
import { CreateLogService } from '../../../../logs/usecases/create-log/create-log.service';

@Injectable()
export class UpdatePasswordService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly createLogService: CreateLogService,
  ) {}

  async execute(dto: UpdatePasswordDto, user: Session['user']) {
    const userRaw = await this.prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!userRaw) {
      throw new UnauthorizedException('Utilisateur non trouvé.');
    }

    const match = await comparePasswords(dto.currentPassword, userRaw.password);

    if (!match) {
      throw new BadRequestException('Mot de passe actuel incorrect.');
    }

    if (await comparePasswords(dto.newPassword, userRaw.password)) {
      throw new BadRequestException(
        'Le nouveau mot de passe doit être différent.',
      );
    }

    const newHashed = await hashPassword(dto.newPassword);

    await this.prisma.user.update({
      where: { id: user.id },
      data: { password: newHashed },
    });

    await this.createLogService.execute(
      {
        appType: AppType.MOBILE,
        logType: LogType.UPDATE,
        message: `L'utilisateur a mis à jour son mot de passe.`,
      },
      user.id,
    );

    return true;
  }
}
