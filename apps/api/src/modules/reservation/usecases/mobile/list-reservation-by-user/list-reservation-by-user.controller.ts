import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { routesV1 } from '../../../../../config/app.routes';
import { ListReservationByUserService } from './list-reservation-by-user.service';
import { AuthenticatedRequest } from '../../../../../types/auth-request';
import { AuthGuard } from '../../../../../shared/applications/guards/auth.guard';

@Controller(routesV1.version)
export class ListReservationByUserController {
  constructor(
    private readonly listReservationByUserIdService: ListReservationByUserService,
  ) {}

  @Get(routesV1.mobile.reservations.me)
  @UseGuards(AuthGuard)
  async listByUser(@Req() req: AuthenticatedRequest) {
    const reservations = await this.listReservationByUserIdService.execute(
      req.session.user.id,
    );

    return { reservations: reservations };
  }
}
