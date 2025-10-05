import { Module } from '@nestjs/common';

import { SharedModule } from '../../shared/shared.module';
import { CreateLogService } from './usecases/create-log/create-log.service';
import { ListLogService } from './usecases/list-log/list-log.service';
import { CreateLogController } from './usecases/create-log/create-log.controller';
import { ListLogController } from './usecases/list-log/list-log.controller';
import { LogRepository } from './domain/repositories/log.repository';
import { GetLogService } from './usecases/get-log/get-log.service';
import { GetLogController } from './usecases/get-log/get-log.controller';
import { LogPrismaRepository } from './infrastructure/repositories/log.prisma.repository';

@Module({
  imports: [SharedModule],
  providers: [
    CreateLogService,
    ListLogService,
    GetLogService,
    {
      provide: LogRepository,
      useClass: LogPrismaRepository,
    },
  ],
  controllers: [CreateLogController, ListLogController, GetLogController],
  exports: [CreateLogService],
})
export class LogModule {}
