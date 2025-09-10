import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Session } from '../../../../types/session';
import { CreateSessionDto } from './create-session.dto';
import { SessionRepository } from '../../domain/repositories/session.repository';
import { Session as SessionEntity } from '../../domain/entities/session.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CreateSessionService {
  constructor(private readonly sessionRepository: SessionRepository) {}

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
    return { message: 'La session a bien été crée.' };
  }
}
