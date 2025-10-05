import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Session } from '../../../../../types/session';
import { CreateSessionDto } from './create-session.dto';
import { SessionRepository } from '../../../domain/repositories/session.repository';
import { Session as SessionEntity } from '../../../domain/entities/session.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateLogService } from '../../../../logs/usecases/create-log/create-log.service';
import { AppType, LogType } from '../../../../logs/domain/entities/log.entity';

@Injectable()
export class CreateSessionService {
  constructor(
    private readonly sessionRepository: SessionRepository,
    private readonly createLogService: CreateLogService,
  ) {}

  async execute(data: CreateSessionDto, user: Session['user']) {
    if (!user) {
      throw new UnauthorizedException(
        'Demande non autorisée. Veuillez vous connecter.',
      );
    }

    const sessionToSave: SessionEntity = {
      id: uuidv4(),
      startDate: data.startDate,
      endDate: data.endDate,
      typeCourseId: data.typeCourseId,
      createdAt: new Date(),
    };

    const sessionRaw = await this.sessionRepository.create(sessionToSave);

    if (!sessionRaw) {
      throw new Error("La session n'a pas pu être crée.");
    }

    await this.createLogService.execute(
      {
        appType: AppType.ADMIN,
        logType: LogType.ADD,
        message: `Session : ${sessionRaw.startDate.toString()} - ${sessionRaw.endDate.toString()}`,
      },
      user,
    );

    return { message: 'La session a bien été crée.' };
  }
}
