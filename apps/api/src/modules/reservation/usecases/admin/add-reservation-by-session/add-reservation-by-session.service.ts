import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AddReservationDto } from './add-reservation.dto';
import { Session } from '../../../../../types/session';
import { ReservationRepository } from '../../../domain/repositories/reservation.repository';
import { CreateLogService } from '../../../../logs/usecases/create-log/create-log.service';
import { AppType, LogType } from '../../../../logs/domain/entities/log.entity';

@Injectable()
export class AddReservationBySessionService {
  constructor(
    private readonly reservationRepository: ReservationRepository,
    private readonly createLogService: CreateLogService,
  ) {}

  async execute(data: AddReservationDto, user: Session['user']) {
    if (!user) {
      throw new UnauthorizedException('Vous devez être connecté');
    }

    const existingReservationUser =
      await this.reservationRepository.findBySessionAndUserId(
        data.sessionId,
        data.userId,
      );

    if (existingReservationUser) {
      throw new Error("L'utilisateur est déjà dans cette session");
    }

    const reservation = await this.reservationRepository.addParticipant(data);

    await this.createLogService.execute(
      {
        appType: AppType.ADMIN,
        logType: LogType.ADD,
        message: `Réservation : ${reservation.id}`,
      },
      user.id,
    );

    return reservation;
  }
}
