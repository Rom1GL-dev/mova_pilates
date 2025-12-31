import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DeleteReservationDto } from './delete-reservation.dto';
import { Session } from '../../../../../types/session';
import { ReservationRepository } from '../../../domain/repositories/reservation.repository';
import { AppType, LogType } from '../../../../logs/domain/entities/log.entity';
import { CreateLogService } from '../../../../logs/usecases/create-log/create-log.service';

@Injectable()
export class DeleteReservationService {
  constructor(
    private readonly reservationRepository: ReservationRepository,
    private readonly createLogService: CreateLogService,
  ) {}

  async execute(data: DeleteReservationDto, user: Session['user']) {
    if (!user) {
      throw new UnauthorizedException(
        'Demande non autorisée. Veuillez vous connecter.',
      );
    }
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
