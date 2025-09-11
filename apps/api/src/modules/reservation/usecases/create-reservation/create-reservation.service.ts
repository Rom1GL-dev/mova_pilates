import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Session } from '../../../../types/session';
import { CreateReservationDto } from './create-reservation.dto';
import { ReservationRepository } from '../../domain/repositories/reservation.repository';
import { Reservation } from '../../domain/entities/reservation.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CreateReservationService {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  async execute(data: CreateReservationDto, user: Session['user']) {
    if (!user) {
      throw new UnauthorizedException('Vous devez être connecté');
    }

    const reservationToSave: Reservation = {
      id: uuidv4(),
      status: data.status,
      userId: data.userId,
      sessionId: data.sessionId,
      createdAt: new Date(),
    };

    const reservationRow =
      await this.reservationRepository.create(reservationToSave);

    if (!reservationRow) {
      throw new Error("Le packs n'a pas pu être crée.");
    }
    return { message: 'Le packs a bien été crée.' };
  }
}
