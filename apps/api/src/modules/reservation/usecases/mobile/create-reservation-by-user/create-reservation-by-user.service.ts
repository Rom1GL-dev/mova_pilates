import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Session } from '../../../../../types/session';
import { CreateReservationByUserDto } from './create-reservation-by-user.dto';
import { PrismaService } from '../../../../../shared/infrastructure/prisma.service';
import { CreateLogService } from '../../../../logs/usecases/create-log/create-log.service';
import { AppType, LogType } from '../../../../logs/domain/entities/log.entity';

@Injectable()
export class CreateReservationByUserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly createLog: CreateLogService,
  ) {}

  async execute(data: CreateReservationByUserDto, user: Session['user']) {
    if (!user) {
      throw new UnauthorizedException('Vous devez être connecté');
    }

    const session = await this.prisma.session.findUnique({
      where: { id: data.sessionId },
      include: { typeCourse: true },
    });

    if (!session) {
      throw new NotFoundException('Session introuvable');
    }

    const confirmedCount = await this.prisma.reservation.count({
      where: {
        sessionId: data.sessionId,
        status: { in: ['CONFIRMED', 'PRESENT'] },
      },
    });

    if (confirmedCount >= session.typeCourse.capacity) {
      throw new BadRequestException('Séance complète');
    }

    const wallet = await this.prisma.wallet.findUnique({
      where: {
        userId_typeCourseId: {
          userId: user.id,
          typeCourseId: session.typeCourseId,
        },
      },
    });

    if (!wallet || wallet.balance <= 0) {
      throw new BadRequestException('Crédits insuffisants');
    }

    const existingReservation = await this.prisma.reservation.findUnique({
      where: {
        sessionId_userId: {
          sessionId: data.sessionId,
          userId: user.id,
        },
      },
    });

    if (
      existingReservation?.status === 'CONFIRMED' ||
      existingReservation?.status === 'PRESENT'
    ) {
      throw new BadRequestException('Vous avez déjà réservé cette séance');
    }

    return this.prisma.$transaction(async (tx) => {
      await tx.wallet.update({
        where: {
          userId_typeCourseId: {
            userId: user.id,
            typeCourseId: session.typeCourseId,
          },
        },
        data: {
          balance: { decrement: 1 },
        },
      });

      let reservation;

      if (existingReservation?.status === 'CANCELLED') {
        reservation = await tx.reservation.update({
          where: {
            sessionId_userId: {
              sessionId: data.sessionId,
              userId: user.id,
            },
          },
          data: {
            status: 'CONFIRMED',
          },
        });
      } else {
        reservation = await tx.reservation.create({
          data: {
            userId: user.id,
            sessionId: data.sessionId,
            status: 'CONFIRMED',
          },
        });
      }

      await this.createLog.execute(
        {
          message: `Réservation confirmée pour la session ${session.id}`,
          logType: LogType.RESERVATION,
          appType: AppType.MOBILE,
        },
        user.id,
      );

      return reservation;
    });
  }
}
