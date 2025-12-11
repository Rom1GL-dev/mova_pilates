import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { routesV1 } from '../../../../../config/app.routes';
import { Roles, RolesGuard } from '../../../../auth/config/role.guard';
import { Role } from '@mova_pilates/shared';
import { AuthGuard } from '../../../../../shared/applications/guards/auth.guard';
import { ListReservationBySessionService } from './list-reservation-by-session.service';

@Controller(routesV1.version)
export class ListReservationBySessionController {
  constructor(
    private readonly listReservationBySessionService: ListReservationBySessionService,
  ) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.enum.ADMIN)
  @Get(routesV1.backoffice.reservations.bySessionId)
  async list(@Param('sessionId') sessionId: string) {
    const reservations =
      await this.listReservationBySessionService.execute(sessionId);

    return { reservations: reservations };
  }
}
