import { Injectable } from '@nestjs/common';
import { Reservation } from '../entities/reservation.entity';
import { AddReservationBySessionDto } from '../../usecases/admin/add-reservation-by-session/add-reservation-by-session.dto';

@Injectable()
export abstract class ReservationRepository {
  abstract create(reservation: Reservation): Promise<Reservation>;
  abstract update(reservation: Reservation): Promise<Reservation>;
  abstract findAll(): Promise<Reservation[]>;
  abstract findById(id: string): Promise<Reservation | null>;
  abstract findByUserId(userId: string): Promise<Reservation[]>;
  abstract delete(id: string): Promise<Reservation>;
  abstract addParticipant(
    data: AddReservationBySessionDto,
  ): Promise<Reservation>;
  abstract findBySessionAndUserId(
    sessionId: string,
    userId: string,
  ): Promise<Reservation | null>;
}
