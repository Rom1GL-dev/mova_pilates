import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../shared/infrastructure/prisma.service';

@Injectable()
export class GetStatsByUserService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(userId: string) {
    const now = new Date();

    const startOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1,
      0,
      0,
      0,
      0,
    );

    const reservations = await this.prisma.reservation.findMany({
      where: {
        userId,
        session: {
          startDate: {
            gte: startOfMonth,
            lte: now,
          },
        },
        status: {
          in: ['CONFIRMED', 'PRESENT'],
        },
      },
      include: {
        session: true,
      },
    });

    const sessionsCount = reservations.length;

    const totalMinutes = reservations.reduce((acc, reservation) => {
      const start = reservation.session.startDate;
      const end = reservation.session.endDate;

      const durationMs = end.getTime() - start.getTime();
      const durationMinutes = durationMs / 1000 / 60;

      return acc + durationMinutes;
    }, 0);

    const totalHours = Number((totalMinutes / 60).toFixed(2));

    return {
      sessionsCount,
      totalHours,
    };
  }
}
