import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DeleteReservationDto } from './delete-reservation.dto';
import { Session } from '../../../../../types/session';
import { ReservationRepository } from '../../../domain/repositories/reservation.repository';
import { AppType, LogType } from '../../../../logs/domain/entities/log.entity';
import { CreateLogService } from '../../../../logs/usecases/create-log/create-log.service';
import { PrismaService } from '../../../../../shared/infrastructure/prisma.service';

@Injectable()
export class DeleteReservationService {
  constructor(
    private readonly reservationRepository: ReservationRepository,
    private readonly createLogService: CreateLogService,
    private readonly prisma: PrismaService,
  ) {}

  async execute(data: DeleteReservationDto, user: Session['user']) {
    if (!user) {
      throw new UnauthorizedException(
        'Demande non autorisée. Veuillez vous connecter.',
      );
    }

    // Si c'est un invité, décrémenter guestCount au lieu de supprimer une réservation
    if (data.isGuest && data.sessionId) {
      const session = await this.prisma.session.findUnique({
        where: { id: data.sessionId },
      });

      if (!session) {
        throw new Error('Session introuvable.');
      }

      if (session.guestCount <= 0) {
        throw new Error('Aucun invité à supprimer.');
      }

      await this.prisma.session.update({
        where: { id: data.sessionId },
        data: {
          guestCount: { decrement: 1 },
        },
      });

      await this.createLogService.execute(
        {
          appType: AppType.ADMIN,
          logType: LogType.DELETE,
          message: `Suppression d'un invité de la session ${data.sessionId}`,
        },
        user.id,
      );

      return { message: "L'invité a bien été supprimé." };
    }

    // Sinon, supprimer la réservation normalement
    const reservationRow = await this.reservationRepository.delete(data.id);

    if (!reservationRow) {
      throw new Error("La reservation n'a pas pu être supprimé.");
    }

    await this.createLogService.execute(
      {
        appType: AppType.ADMIN,
        logType: LogType.DELETE,
        message: `Suppression de la réservation de ${reservationRow.userId}`,
      },
      user.id,
    );

    return { message: 'La reservation a bien été supprimé.' };
  }
}
