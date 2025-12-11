import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { routesV1 } from '../../../../../config/app.routes';
import { ListReservationByUserService } from './list-reservation-by-user.service';
import { Roles, RolesGuard } from '../../../../auth/config/role.guard';
import { Role } from '@mova_pilates/shared';
import { AuthGuard } from '../../../../../shared/applications/guards/auth.guard';

@Controller(routesV1.version)
export class ListReservationByUserController {
  constructor(
    private readonly listReservationByUserIdService: ListReservationByUserService,
  ) {}

  @Get(routesV1.mobile.reservations.byUserId)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.enum.USER)
  async listByUser(@Param('userId') userId: string) {
    const reservations =
      await this.listReservationByUserIdService.execute(userId);

    return { reservations: reservations };
  }
}
