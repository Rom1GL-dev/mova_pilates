import { Session } from '../../../../../types/session';
import { comparePasswords } from '../../../../auth/config/sessions';
import { hashPassword } from '../../../../../shared/utils/hashPassword';
import { AppType, LogType } from '../../../../logs/domain/entities/log.entity';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../../../../shared/infrastructure/prisma.service';
import { CreateLogService } from '../../../../logs/usecases/create-log/create-log.service';
import { UpdateProfileDto } from './update-profile.dto';

@Injectable()
export class UpdateProfileService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly createLogService: CreateLogService,
  ) {}

  async execute(
    data: UpdateProfileDto,
    user: Session['user'],
  ): Promise<Session['user']> {
    if (!user) {
      throw new UnauthorizedException(
        'Demande non autorisée. Veuillez vous connecter.',
      );
    }

    const existingUser = await this.prisma.user.findUnique({
      where: { id: data.id },
    });

    if (!existingUser) {
      throw new ConflictException("L'utilisateur n'existe pas");
    }

    const updateData: any = {
      firstname: data.firstname,
      lastname: data.lastname,
      tel: data.tel,
      dob: data.dob,
    };

    if (
      data.password &&
      !(await comparePasswords(data.password, existingUser.password))
    ) {
      updateData.password = await hashPassword(data.password);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: data.id },
      data: updateData,
    });

    await this.createLogService.execute(
      {
        appType: AppType.MOBILE,
        logType: LogType.UPDATE,
        message: `Profil modifié :
AVANT -> firstname: ${existingUser.firstname}, lastname: ${existingUser.lastname}, tel: ${existingUser.tel}, dob: ${existingUser.dob}
APRÈS -> firstname: ${updatedUser.firstname}, lastname: ${updatedUser.lastname}, tel: ${updatedUser.tel}, dob: ${updatedUser.dob}`,
      },
      user.id,
    );

    const sessionUser: Session['user'] = {
      id: updatedUser.id,
      email: updatedUser.email,
      firstname: updatedUser.firstname ?? '',
      lastname: updatedUser.lastname ?? '',
      role: updatedUser.role,
      tel: updatedUser.tel ?? '',
      dob: updatedUser.dob,
    };

    return sessionUser;
  }
}
