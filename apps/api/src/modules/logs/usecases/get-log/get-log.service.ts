import { Injectable } from '@nestjs/common';
import { LogRepository } from '../../domain/repositories/log.repository';

@Injectable()
export class GetLogService {
  constructor(private readonly packRepository: LogRepository) {}

  execute(id: string) {
    return this.packRepository.findById(id);
  }
}
