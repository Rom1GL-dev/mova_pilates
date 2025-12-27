import { Controller, Get, Req } from '@nestjs/common';
import { routesV1 } from '../../../../../config/app.routes';
import { GetNextReservationByUserService } from './get-next-reservation-by-user.service';
import { AuthenticatedRequest } from '../../../../../types/auth-request';

@Controller(routesV1.version)
export class GetNextReservationByUserController {
  constructor(
    private readonly getNextReservationByUser: GetNextReservationByUserService,
  ) {}

  @Get(routesV1.mobile.reservations.nextReservationbyUser)
  // @UseGuards(AuthGuard, RolesGuard)
  // @Roles(Role.enum.USER)
  async getNextReservation(@Req() req: AuthenticatedRequest) {
    const reservation = await this.getNextReservationByUser.execute(
      req.session.user.id,
    );
    return { reservation };
  }
}
