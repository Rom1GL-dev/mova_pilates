import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class AnalyticsRepository {
  abstract getTotalUsers(): Promise<number>;
  abstract getTotalNewMemberCurrentMonth(): Promise<number>;
  abstract getMostPurchasedPack(): Promise<{
    packId: string;
    count: number;
    packLabel: string;
  } | null>;
}
