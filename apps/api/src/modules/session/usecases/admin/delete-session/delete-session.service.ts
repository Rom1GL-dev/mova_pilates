import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DeleteSessionDto } from './delete-session.dto';
import { Session } from '../../../../../types/session';
import { SessionRepository } from '../../../domain/repositories/session.repository';
import { AppType, LogType } from '../../../../logs/domain/entities/log.entity';
import { CreateLogService } from '../../../../logs/usecases/create-log/create-log.service';

@Injectable()
export class DeleteSessionService {
  constructor(
    private readonly sessionRepository: SessionRepository,
    private readonly createLogService: CreateLogService,
  ) {}

  async execute(data: DeleteSessionDto, user: Session['user']) {
    if (!user) {
      throw new UnauthorizedException(
        'Demande non autorisée. Veuillez vous connecter.',
      );
    }
    const sessionRaw = await this.sessionRepository.delete(data.id);

    if (!sessionRaw) {
      throw new Error("La session n'a pas pu être supprimé.");
    }

    await this.createLogService.execute(
      {
        appType: AppType.ADMIN,
        logType: LogType.DELETE,
        message: `Session : ${sessionRaw.startDate.toString()} - ${sessionRaw.endDate.toString()}`,
      },
      user,
    );
    return { message: 'La session a bien été supprimé.' };
  }
}
