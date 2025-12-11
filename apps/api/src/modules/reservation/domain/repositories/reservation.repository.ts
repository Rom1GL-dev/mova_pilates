import { Injectable } from '@nestjs/common';
import { Reservation } from '../entities/reservation.entity';
import { AddReservationDto } from '../../usecases/admin/add-reservation-by-session/add-reservation.dto';

@Injectable()
export abstract class ReservationRepository {
  abstract create(reservation: Reservation): Promise<Reservation>;
  abstract update(reservation: Reservation): Promise<Reservation>;
  abstract findAll(): Promise<Reservation[]>;
  abstract findById(id: string): Promise<Reservation | null>;
  abstract findByUserId(userId: string): Promise<Reservation[]>;
  abstract delete(id: string): Promise<Reservation>;
  abstract addParticipant(data: AddReservationDto): Promise<Reservation>;
  abstract findBySessionAndUserId(
    sessionId: string,
    userId: string,
  ): Promise<Reservation | null>;
}
