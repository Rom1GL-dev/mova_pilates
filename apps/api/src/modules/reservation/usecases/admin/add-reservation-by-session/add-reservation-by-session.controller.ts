import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { routesV1 } from '../../../../../config/app.routes';
import { Roles, RolesGuard } from '../../../../auth/config/role.guard';
import { Role } from '@mova_pilates/shared';
import { AuthGuard } from '../../../../../shared/applications/guards/auth.guard';
import { AddReservationBySessionService } from './add-reservation-by-session.service';
import { AddReservationBySessionDto } from './add-reservation-by-session.dto';
import { AuthenticatedRequest } from '../../../../../types/auth-request';

@Controller(routesV1.version)
export class AddReservationBySessionController {
  constructor(
    private readonly addReservationBySessionService: AddReservationBySessionService,
  ) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.enum.ADMIN)
  @Post(routesV1.backoffice.reservations.addReservation)
  async add(
    @Body() body: AddReservationBySessionDto,
    @Req() request: AuthenticatedRequest,
  ) {
    const reservation = await this.addReservationBySessionService.execute(
      body,
      request.session.user,
    );

    return { reservation: reservation };
  }
}
