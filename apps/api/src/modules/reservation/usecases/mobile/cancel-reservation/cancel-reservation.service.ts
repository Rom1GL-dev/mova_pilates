import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../../../shared/infrastructure/prisma.service';
import { addHours, isBefore } from 'date-fns';
import { CreateLogService } from '../../../../logs/usecases/create-log/create-log.service';
import { AppType, LogType } from '../../../../logs/domain/entities/log.entity';
import { MailerService } from '../../../../../shared/infrastructure/mailer.service';
import { EmailTemplateService } from '../../../../../shared/infrastructure/email-template.service';

@Injectable()
export class CancelReservationService {
  private readonly logger = new Logger(CancelReservationService.name);

  constructor(
    private readonly prisma: PrismaService,
    private createLogService: CreateLogService,
    private readonly mailer: MailerService,
    private readonly emailTemplate: EmailTemplateService,
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
        user: true,
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

    const result = await this.prisma.$transaction(async (tx) => {
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

    // Email de confirmation d'annulation (non bloquant)
    const cancelEmail = this.emailTemplate.reservationCancellation(
      reservation.user.firstname,
      reservation.session.typeCourse.label,
      reservation.session.startDate,
    );
    this.mailer
      .sendMail({
        to: reservation.user.email,
        subject: cancelEmail.subject,
        html: cancelEmail.html,
      })
      .catch((error) => {
        this.logger.error(
          `Erreur envoi confirmation annulation à ${reservation.user.email}`,
          error,
        );
      });

    return result;
  }
}
