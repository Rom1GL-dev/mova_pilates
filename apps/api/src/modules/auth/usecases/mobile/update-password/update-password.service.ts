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

@Injectable()
export class UpdatePasswordService {
  constructor(private readonly prisma: PrismaService) {}

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

    return true;
  }
}
