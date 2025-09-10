import { Injectable } from '@nestjs/common';
import { Reservation } from '../entities/reservation.entity';

@Injectable()
export abstract class ReservationRepository {
  abstract create(reservation: Reservation): Promise<Reservation>;
  abstract update(reservation: Reservation): Promise<Reservation>;
  abstract findAll(): Promise<Reservation[]>;
  abstract findById(id: string): Promise<Reservation | null>;
  abstract delete(id: string): Promise<Reservation>;
}
