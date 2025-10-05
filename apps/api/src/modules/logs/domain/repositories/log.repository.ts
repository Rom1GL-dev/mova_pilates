import { Injectable } from '@nestjs/common';
import { Log } from '../entities/log.entity';

@Injectable()
export abstract class LogRepository {
  abstract create(pack: Log): Promise<Log>;
  abstract findAll(): Promise<Log[]>;
  abstract findById(id: string): Promise<Log | null>;
}
