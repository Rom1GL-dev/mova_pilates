import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UpdateSessionDto } from './update-session.dto';
import { Session } from '../../../../../types/session';
import { SessionRepository } from '../../../domain/repositories/session.repository';
import { Session as SessionEntity } from '../../../domain/entities/session.entity';
import { CreateLogService } from '../../../../logs/usecases/create-log/create-log.service';
import { AppType, LogType } from '../../../../logs/domain/entities/log.entity';

@Injectable()
export class UpdateSessionService {
  constructor(
    private readonly sessionRepository: SessionRepository,
    private readonly createLogService: CreateLogService,
  ) {}

  async execute(data: UpdateSessionDto, user: Session['user']) {
    if (!user) {
      throw new UnauthorizedException(
        'Demande non autorisée. Veuillez vous connecter.',
      );
    }

    const sessionToSave: SessionEntity = {
      id: data.id,
      startDate: data.startDate,
      endDate: data.endDate,
      typeCourseId: data.typeCourseId,
      createdAt: data.createdAt,
      updatedAt: new Date(),
    };

    const sessionRaw = await this.sessionRepository.update(sessionToSave);

    if (!sessionRaw) {
      throw new Error("La session n'a pas pu être modifié.");
    }

    await this.createLogService.execute(
      {
        appType: AppType.ADMIN,
        logType: LogType.UPDATE,
        message: `Session : ${sessionRaw.startDate.toString()} - ${sessionRaw.endDate.toString()}`,
      },
      user.id,
    );

    return { message: 'La session a bien été modifié.' };
  }
}
