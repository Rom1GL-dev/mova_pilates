import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../../../shared/infrastructure/prisma.service';
import { addHours, isBefore } from 'date-fns';
import { CreateLogService } from '../../../../logs/usecases/create-log/create-log.service';
import { AppType, LogType } from '../../../../logs/domain/entities/log.entity';

@Injectable()
export class CancelReservationService {
  constructor(
    private readonly prisma: PrismaService,
    private createLogService: CreateLogService,
  ) {}

  async execute(sessionId: string, userId: string) {
    const reservation = await this.prisma.reservation.findUnique({
      where: {
        sessionId_userId: {
          sessionId,
          userId,
        },
      },
      include: {
        session: {
          include: { typeCourse: true },
        },
      },
    });

    if (!reservation) {
      throw new NotFoundException('Réservation introuvable');
    }

    if (reservation.status === 'CANCELLED') {
      throw new ForbiddenException('Réservation déjà annulée');
    }

    const limitDate = addHours(new Date(), 24);
    if (isBefore(reservation.session.startDate, limitDate)) {
      throw new ForbiddenException(
        'Impossible d’annuler une réservation à moins de 24h',
      );
    }

    await this.createLogService.execute(
      {
        message: `Annulation de la réservation pour la session ${sessionId}`,
        logType: LogType.CANCELLATION,
        appType: AppType.MOBILE,
      },
      userId,
    );

    return this.prisma.$transaction(async (tx) => {
      await tx.reservation.update({
        where: {
          sessionId_userId: {
            sessionId,
            userId,
          },
        },
        data: { status: 'CANCELLED' },
      });

      await tx.wallet.upsert({
        where: {
          userId_typeCourseId: {
            userId,
            typeCourseId: reservation.session.typeCourseId,
          },
        },
        update: { balance: { increment: 1 } },
        create: {
          userId,
          typeCourseId: reservation.session.typeCourseId,
          balance: 1,
        },
      });

      return reservation;
    });
  }
}
