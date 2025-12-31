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

  async getMostPurchasedPack() {
    const result = await this.prisma.order.groupBy({
      by: ['packId'],
      where: {
        status: 'SUCCESS',
      },
      _count: {
        packId: true,
      },
      orderBy: {
        _count: {
          packId: 'desc',
        },
      },
      take: 1,
    });

    if (result.length === 0) return null;

    const pack = await this.prisma.pack.findUnique({
      where: { id: result[0].packId },
      select: {
        label: true,
      },
    });

    return {
      packId: result[0].packId,
      count: result[0]._count.packId,
      packLabel: pack?.label ?? 'Pack inconnu',
    };
  }
}
