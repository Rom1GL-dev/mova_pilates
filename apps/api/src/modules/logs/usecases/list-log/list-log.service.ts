import { Injectable } from '@nestjs/common';
import { LogRepository } from '../../domain/repositories/log.repository';

@Injectable()
export class ListLogService {
  constructor(private readonly logRepository: LogRepository) {}

  execute() {
    return this.logRepository.findAll();
  }
}
