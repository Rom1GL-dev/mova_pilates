import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DeleteReservationDto } from './delete-reservation.dto';
import { Session } from '../../../../../types/session';
import { ReservationRepository } from '../../../domain/repositories/reservation.repository';

@Injectable()
export class DeleteReservationService {
  constructor(private readonly reservationRepository: ReservationRepository) {}

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
    return { message: 'La reservation a bien été supprimé.' };
  }
}
