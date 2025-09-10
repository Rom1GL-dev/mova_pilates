import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DeleteSessionDto } from './delete-session.dto';
import { Session } from '../../../../types/session';
import { SessionRepository } from '../../domain/repositories/session.repository';

@Injectable()
export class DeleteSessionService {
  constructor(private readonly sessionRepository: SessionRepository) {}

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
    return { message: 'La session a bien été supprimé.' };
  }
}
