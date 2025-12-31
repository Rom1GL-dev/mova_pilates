import { Injectable } from '@nestjs/common';
import { AnalyticsRepository } from '../../domain/repositories/analytics.repository';

@Injectable()
export class GetAnalyticsService {
  constructor(private readonly analyticsRepository: AnalyticsRepository) {}

  async execute() {
    const totalUsers = await this.analyticsRepository.getTotalUsers();
    const totalNewMemberCurrentMonth =
      await this.analyticsRepository.getTotalNewMemberCurrentMonth();

    const mostPurchasedPack =
      await this.analyticsRepository.getMostPurchasedPack();

    return {
      totalUsers,
      totalNewMemberCurrentMonth,
      mostPurchasedPack,
    };
  }
}
