import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class AnalyticsRepository {
  abstract getTotalUsers(): Promise<number>;
  abstract getTotalNewMemberCurrentMonth(): Promise<number>;
}
