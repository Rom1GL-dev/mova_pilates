import { Injectable } from '@nestjs/common';
import { Session } from '../entities/session.entity';

@Injectable()
export abstract class SessionRepository {
  abstract findById(id: string): Promise<Session | null>;
}
