import { Injectable } from '@nestjs/common';
import { ReservationRepository } from '../../domain/repositories/reservation.repository';

@Injectable()
export class ListReservationService {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  execute() {
    return this.reservationRepository.findAll();
  }
}
