import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateLogDto } from './create-log.dto';
import { LogRepository } from '../../domain/repositories/log.repository';
import { Log } from '../../domain/entities/log.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CreateLogService {
  constructor(private readonly logRepository: LogRepository) {}

  async execute(data: CreateLogDto, userId: string) {
    if (!userId) {
      throw new UnauthorizedException(
        'Demande non autorisée. Veuillez vous connecter.',
      );
    }

    const logToSave: Log = {
      id: uuidv4(),
      message: data.message,
      logType: data.logType,
      appType: data.appType,
      userId: userId,
      createdAt: new Date(),
    };

    const logRow = await this.logRepository.create(logToSave);

    if (!logRow) {
      throw new Error('Une erreur est survenue lors de la création du packs.');
    }
    return { message: 'Le log a bien été crée.' };
  }
}
