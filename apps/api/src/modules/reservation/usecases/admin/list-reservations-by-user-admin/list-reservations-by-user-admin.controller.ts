import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { routesV1 } from '../../../../../config/app.routes';
import { Roles, RolesGuard } from '../../../../auth/config/role.guard';
import { Role } from '@mova_pilates/shared';
import { AuthGuard } from '../../../../../shared/applications/guards/auth.guard';
import { ListReservationByUserAdminService } from './list-reservations-by-user-admin.service';

@Controller(routesV1.version)
export class ListReservationByUserAdminController {
  constructor(
    private readonly listReservationByUserAdminService: ListReservationByUserAdminService,
  ) {}

  @Get(routesV1.backoffice.reservations.byUserId)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.enum.ADMIN)
  async listByUser(@Param('userId') userId: string) {
    const reservations =
      await this.listReservationByUserAdminService.execute(userId);

    return { reservations: reservations };
  }
}
