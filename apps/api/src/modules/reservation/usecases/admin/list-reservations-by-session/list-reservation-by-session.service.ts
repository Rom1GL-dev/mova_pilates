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

    if (!sessionRaw) {
      return [];
    }

    const capacity = sessionRaw.customCapacity ?? sessionRaw.typeCourse.capacity;

    // Réservations des utilisateurs
    const userReservations = sessionRaw.Reservation.map((res) => {
      return {
        ...res.user,
        reservationStatus: res.status,
        reservationId: res.id,
        sessionId: sessionRaw.id,
        capacity,
        isGuest: false,
      };
    });

    // Ajout des invités comme lignes fictives
    const guestCount = sessionRaw.guestCount ?? 0;
    const guestReservations = Array.from({ length: guestCount }, (_, index) => ({
      id: `guest-${index}`,
      firstname: 'Invité',
      lastname: `#${index + 1}`,
      email: null,
      role: 'USER',
      tel: null,
      dob: null,
      deletedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      reservationStatus: 'CONFIRMED',
      reservationId: `guest-reservation-${index}`,
      sessionId: sessionRaw.id,
      capacity,
      isGuest: true,
    }));

    return [...userReservations, ...guestReservations];
  }
}
