import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { routesV1 } from '../../../../../config/app.routes';
import { GetNextReservationByUserService } from './get-next-reservation-by-user.service';
import { AuthenticatedRequest } from '../../../../../types/auth-request';
import { AuthGuard } from '../../../../../shared/applications/guards/auth.guard';

@Controller(routesV1.version)
export class GetNextReservationByUserController {
  constructor(
    private readonly getNextReservationByUser: GetNextReservationByUserService,
  ) {}

  @Get(routesV1.mobile.reservations.nextReservationbyUser)
  @UseGuards(AuthGuard)
  async getNextReservation(@Req() req: AuthenticatedRequest) {
    const reservation = await this.getNextReservationByUser.execute(
      req.session.user.id,
    );
    return { reservation };
  }
}
