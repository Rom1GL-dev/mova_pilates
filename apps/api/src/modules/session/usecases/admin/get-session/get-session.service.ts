import { Injectable } from '@nestjs/common';
import { SessionRepository } from '../../../domain/repositories/session.repository';

@Injectable()
export class GetSessionService {
  constructor(private readonly sessionRepository: SessionRepository) {}

  execute(id: string) {
    return this.sessionRepository.findById(id);
  }
}
