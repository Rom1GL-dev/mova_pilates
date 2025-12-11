import { Injectable } from '@nestjs/common';
import { ReservationRepository } from '../../../domain/repositories/reservation.repository';

@Injectable()
export class ListReservationByUserAdminService {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  execute(userId: string) {
    return this.reservationRepository.findByUserId(userId);
  }
}
