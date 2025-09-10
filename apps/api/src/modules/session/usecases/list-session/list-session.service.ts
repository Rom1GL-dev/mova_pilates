import { Injectable } from '@nestjs/common';
import { SessionRepository } from '../../domain/repositories/session.repository';

@Injectable()
export class ListSessionService {
  constructor(private readonly sessionRepository: SessionRepository) {}

  execute() {
    return this.sessionRepository.findAll();
  }
}
