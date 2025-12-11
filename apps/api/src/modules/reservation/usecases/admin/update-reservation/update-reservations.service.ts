import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UpdateReservationsDto } from './update-reservations.dto';
import { Session } from '../../../../../types/session';
import { ReservationRepository } from '../../../domain/repositories/reservation.repository';
import { Reservation } from '../../../domain/entities/reservation.entity';

@Injectable()
export class UpdateReservationsService {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  async execute(data: UpdateReservationsDto, user: Session['user']) {
    const existingReservation = await this.reservationRepository.findById(
      data.id,
    );

    if (!existingReservation) {
      throw new Error("La reservation n'existe pas.");
    }

    if (!user) {
      throw new UnauthorizedException('Vous devez être connecté');
    }

    const reservationToSave: Reservation = {
      id: data.id,
      status: data.status ?? existingReservation.status,
      userId: data.userId ?? existingReservation.userId,
      sessionId: data.sessionId ?? existingReservation.sessionId,
      createdAt: data.createdAt ?? existingReservation.createdAt,
      updatedAt: new Date(),
    };

    const reservationRaw =
      await this.reservationRepository.update(reservationToSave);

    if (!reservationRaw) {
      throw new Error("La reservation n'a pas pu être crée.");
    }
    return { message: 'La reservation a bien été modifié.' };
  }
}
