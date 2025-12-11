import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../shared/infrastructure/prisma.service';

@Injectable()
export class ListReservationBySessionService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(sessionId: string) {
    const sessionRaw = await this.prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        typeCourse: true,
        Reservation: {
          include: {
            user: true,
          },
        },
      },
    });

    return sessionRaw?.Reservation.map((res) => {
      return {
        ...res.user,
        reservationStatus: res.status,
        reservationId: res.id,
        sessionId: sessionRaw.id,
        capacity: sessionRaw.typeCourse.capacity,
      };
    });
  }
}
