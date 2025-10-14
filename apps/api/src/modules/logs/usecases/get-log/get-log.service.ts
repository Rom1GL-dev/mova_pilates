import { Injectable } from '@nestjs/common';
import { LogRepository } from '../../domain/repositories/log.repository';

@Injectable()
export class GetLogService {
  constructor(private readonly logRepository: LogRepository) {}

  execute(id: string) {
    return this.logRepository.findById(id);
  }
}
