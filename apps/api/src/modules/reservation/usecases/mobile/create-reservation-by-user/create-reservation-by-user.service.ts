import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Session } from '../../../../../types/session';
import { CreateReservationByUserDto } from './create-reservation-by-user.dto';
import { PrismaService } from '../../../../../shared/infrastructure/prisma.service';
import { CreateLogService } from '../../../../logs/usecases/create-log/create-log.service';
import { AppType, LogType } from '../../../../logs/domain/entities/log.entity';
import { MailerService } from '../../../../../shared/infrastructure/mailer.service';
import { EmailTemplateService } from '../../../../../shared/infrastructure/email-template.service';

@Injectable()
export class CreateReservationByUserService {
  private readonly logger = new Logger(CreateReservationByUserService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly createLog: CreateLogService,
    private readonly mailer: MailerService,
    private readonly emailTemplate: EmailTemplateService,
  ) {}

  async execute(data: CreateReservationByUserDto, user: Session['user']) {
    if (!user) {
      throw new UnauthorizedException('Vous devez être connecté');
    }

    const session = await this.prisma.session.findUnique({
      where: { id: data.sessionId },
      include: { typeCourse: true },
    });

    if (!session || session.archivedAt) {
      throw new NotFoundException('Session introuvable');
    }

    const confirmedCount = await this.prisma.reservation.count({
      where: {
        sessionId: data.sessionId,
        status: { in: ['CONFIRMED', 'PRESENT'] },
      },
    });

    // Utilise customCapacity si défini, sinon la capacité du type de cours
    const effectiveCapacity = session.customCapacity ?? session.typeCourse.capacity;

    // Prend en compte les invités dans le calcul de places disponibles
    const totalOccupied = confirmedCount + (session.guestCount ?? 0);

    if (totalOccupied >= effectiveCapacity) {
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

      // Email de confirmation de réservation (non bloquant)
      const confirmEmail = this.emailTemplate.reservationConfirmation(
        user.firstname,
        session.typeCourse.label,
        session.startDate,
      );
      this.mailer
        .sendMail({
          to: user.email,
          subject: confirmEmail.subject,
          html: confirmEmail.html,
        })
        .catch((error) => {
          this.logger.error(
            `Erreur envoi confirmation réservation à ${user.email}`,
            error,
          );
        });

      return reservation;
    });
  }
}
