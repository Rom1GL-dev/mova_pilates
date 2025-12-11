import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DeleteUserDto } from './delete-user.dto';
import { Session } from '../../../../../types/session';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { AppType, LogType } from '../../../../logs/domain/entities/log.entity';
import { CreateLogService } from '../../../../logs/usecases/create-log/create-log.service';

@Injectable()
export class DeleteUserService {
  constructor(
    private readonly userReporitory: UserRepository,
    private readonly createLogService: CreateLogService,
  ) {}

  async execute(data: DeleteUserDto, user: Session['user']) {
    if (!user) {
      throw new UnauthorizedException(
        'Demande non autorisée. Veuillez vous connecter.',
      );
    }
    const userRow = await this.userReporitory.delete(data.id);

    if (!userRow) {
      return { message: "L'utilisateur n'a pas pu être supprimé." };
    }

    await this.createLogService.execute(
      {
        appType: AppType.ADMIN,
        logType: LogType.DELETE,
        message: `Utilisateur : ${userRow.firstname} ${userRow.lastname}`,
      },
      user.id,
    );

    return { message: "L'utilisateur a bien été supprimé." };
  }
}
