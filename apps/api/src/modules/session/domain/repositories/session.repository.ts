import { Injectable } from '@nestjs/common';
import { Session } from '../entities/session.entity';

@Injectable()
export abstract class SessionRepository {
  abstract create(pack: Session): Promise<Session>;
  abstract update(pack: Session): Promise<Session>;
  abstract findAll(): Promise<Session[]>;
  abstract findById(id: string): Promise<Session | null>;
  abstract delete(id: string): Promise<Session>;
}
