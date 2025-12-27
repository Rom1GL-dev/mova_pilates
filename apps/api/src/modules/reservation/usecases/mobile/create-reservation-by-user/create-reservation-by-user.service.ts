import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Session } from '../../../../../types/session';
import { ReservationRepository } from '../../../domain/repositories/reservation.repository';
import { Reservation } from '../../../domain/entities/reservation.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateReservationByUserDto } from './create-reservation-by-user.dto';

@Injectable()
export class CreateReservationByUserService {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  async execute(data: CreateReservationByUserDto, user: Session['user']) {
    if (!user) {
      throw new UnauthorizedException('Vous devez être connecté');
    }

    const existingReservation =
      await this.reservationRepository.findBySessionAndUserId(
        data.sessionId,
        data.userId,
      );

    if (existingReservation) {
      throw new Error('Vous êtes déjà sur cette réservation');
    }

    const reservationToSave: Reservation = {
      id: uuidv4(),
      status: 'PENDING',
      userId: data.userId,
      sessionId: data.sessionId,
      createdAt: new Date(),
    };

    const reservationRow =
      await this.reservationRepository.create(reservationToSave);

    if (!reservationRow) {
      throw new Error("La réservation n'a pas pu être crée.");
    }
    return { message: 'La réservation a bien été crée.' };
  }
}
