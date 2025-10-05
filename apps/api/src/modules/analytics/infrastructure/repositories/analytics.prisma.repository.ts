import { Injectable } from '@nestjs/common';
import { AnalyticsRepository } from '../../domain/repositories/analytics.repository';
import { PrismaService } from '../../../../shared/infrastructure/prisma.service';

@Injectable()
export class AnalyticsPrismaRepository implements AnalyticsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getTotalUsers(): Promise<number> {
    return this.prisma.user.count();
  }

  async getTotalNewMemberCurrentMonth(): Promise<number> {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const endOfMonth = new Date(startOfMonth);
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);

    return this.prisma.user.count({
      where: {
        createdAt: {
          gte: startOfMonth,
          lt: endOfMonth,
        },
      },
    });
  }
}
