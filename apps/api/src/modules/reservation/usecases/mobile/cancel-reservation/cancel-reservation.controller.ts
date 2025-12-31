import { Controller, Delete, Param, Req, UseGuards } from '@nestjs/common';
import { routesV1 } from '../../../../../config/app.routes';
import { CancelReservationService } from './cancel-reservation.service';
import { AuthGuard } from '../../../../../shared/applications/guards/auth.guard';
import { AuthenticatedRequest } from '../../../../../types/auth-request';

@Controller(routesV1.version)
export class CancelReservationController {
  constructor(
    private readonly cancelReservationService: CancelReservationService,
  ) {}

  @UseGuards(AuthGuard)
  @Delete(routesV1.mobile.reservations.byId)
  async cancel(
    @Req() req: AuthenticatedRequest,
    @Param('id') reservationId: string,
  ) {
    const reservation = await this.cancelReservationService.execute(
      reservationId,
      req.session.user.id,
    );

    return { reservation };
  }
}
