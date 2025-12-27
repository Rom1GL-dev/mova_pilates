import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../shared/infrastructure/prisma.service';

@Injectable()
export class GetNextReservationByUserService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(userId: string) {
    return this.prisma.reservation.findFirst({
      where: {
        userId,
        session: {
          startDate: {
            gt: new Date(),
          },
        },
        status: {
          not: 'CANCELLED',
        },
      },
      orderBy: {
        session: {
          startDate: 'asc',
        },
      },
      include: {
        session: {
          include: {
            typeCourse: true,
          },
        },
        user: true,
      },
    });
  }
}
