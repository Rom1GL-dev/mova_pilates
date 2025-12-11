import { Module } from '@nestjs/common';

import { SharedModule } from '../../shared/shared.module';
import { CreateReservationService } from './usecases/admin/create-reservation/create-reservation.service';
import { DeleteReservationService } from './usecases/admin/delete-reservation/delete-reservation.service';
import { ListReservationService } from './usecases/admin/list-reservation/list-reservation.service';
import { UpdateReservationsService } from './usecases/admin/update-reservation/update-reservations.service';
import { CreateReservationController } from './usecases/admin/create-reservation/create-reservation.controller';
import { ListReservationController } from './usecases/admin/list-reservation/list-reservation.controller';
import { DeleteReservationController } from './usecases/admin/delete-reservation/delete-reservation.controller';
import { UpdateReservationsController } from './usecases/admin/update-reservation/update-reservations.controller';
import { ReservationRepository } from './domain/repositories/reservation.repository';
import { TypeCoursePrismaRepository } from './infrastructure/repositories/reservation.prisma.repository';
import { ListReservationByUserController } from './usecases/mobile/list-reservation-by-user/list-reservation-by-user.controller';
import { ListReservationByUserService } from './usecases/mobile/list-reservation-by-user/list-reservation-by-user.service';
import { CreateReservationByUserController } from './usecases/mobile/create-reservation-by-user/create-reservation-by-user.controller';
import { CreateReservationByUserService } from './usecases/mobile/create-reservation-by-user/create-reservation-by-user.service';
import { ListReservationBySessionService } from './usecases/admin/list-reservations-by-session/list-reservation-by-session.service';
import { ListReservationBySessionController } from './usecases/admin/list-reservations-by-session/list-reservation-by-session.controller';
import { AddReservationBySessionController } from './usecases/admin/add-reservation-by-session/add-reservation-by-session.controller';
import { AddReservationBySessionService } from './usecases/admin/add-reservation-by-session/add-reservation-by-session.service';
import { LogModule } from '../logs/log.module';
import { ListReservationByUserAdminController } from './usecases/admin/list-reservations-by-user-admin/list-reservations-by-user-admin.controller';
import { ListReservationByUserAdminService } from './usecases/admin/list-reservations-by-user-admin/list-reservations-by-user-admin.service';

@Module({
  imports: [SharedModule, LogModule],
  providers: [
    CreateReservationService,
    AddReservationBySessionService,
    DeleteReservationService,
    ListReservationService,
    UpdateReservationsService,
    ListReservationByUserService,
    CreateReservationByUserService,
    ListReservationBySessionService,
    ListReservationByUserAdminService,

    {
      provide: ReservationRepository,
      useClass: TypeCoursePrismaRepository,
    },
  ],
  controllers: [
    CreateReservationController,
    AddReservationBySessionController,
    DeleteReservationController,
    ListReservationController,
    UpdateReservationsController,
    ListReservationByUserController,
    CreateReservationByUserController,
    ListReservationBySessionController,
    ListReservationByUserAdminController,
  ],
  exports: [],
})
export class ReservationModule {}
