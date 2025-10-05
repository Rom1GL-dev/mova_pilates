import { Module } from '@nestjs/common';

import { SharedModule } from '../../shared/shared.module';
import { AnalyticsRepository } from './domain/repositories/analytics.repository';
import { GetAnalyticsService } from './usecases/get-analytics/get-analytics.service';
import { GetAnalyticsController } from './usecases/get-analytics/get-analytics.controller';
import { AnalyticsPrismaRepository } from './infrastructure/repositories/analytics.prisma.repository';

@Module({
  imports: [SharedModule],
  providers: [
    GetAnalyticsService,
    {
      provide: AnalyticsRepository,
      useClass: AnalyticsPrismaRepository,
    },
  ],
  controllers: [GetAnalyticsController],
  exports: [],
})
export class AnalyticsModule {}
