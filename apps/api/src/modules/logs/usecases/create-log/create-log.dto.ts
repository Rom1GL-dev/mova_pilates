import { IsNumber, IsString } from 'class-validator';
import { AppType, LogType } from '../../domain/entities/log.entity';

export class CreateLogDto {
  @IsString()
  appType: AppType;

  @IsString()
  logType: LogType;

  @IsNumber()
  message: string;
}
