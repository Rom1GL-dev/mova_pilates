import { Module } from '@nestjs/common';

import { SharedModule } from '../../shared/shared.module';
import { CreateReservationService } from './usecases/create-reservation/create-reservation.service';
import { DeleteReservationService } from './usecases/delete-reservation/delete-reservation.service';
import { ListReservationService } from './usecases/list-reservation/list-reservation.service';
import { UpdateReservationsService } from './usecases/update-reservation/update-reservations.service';
import { CreateReservationController } from './usecases/create-reservation/create-reservation.controller';
import { ListReservationController } from './usecases/list-reservation/list-reservation.controller';
import { DeleteReservationController } from './usecases/delete-reservation/delete-reservation.controller';
import { UpdateReservationsController } from './usecases/update-reservation/update-reservations.controller';
import { ReservationRepository } from './domain/repositories/reservation.repository';
import { TypeCoursePrismaRepository } from './infrastructure/repositories/reservation.prisma.repository';

@Module({
  imports: [SharedModule],
  providers: [
    CreateReservationService,
    DeleteReservationService,
    ListReservationService,
    UpdateReservationsService,
    {
      provide: ReservationRepository,
      useClass: TypeCoursePrismaRepository,
    },
  ],
  controllers: [
    CreateReservationController,
    DeleteReservationController,
    ListReservationController,
    UpdateReservationsController,
  ],
  exports: [],
})
export class ReservationModule {}
