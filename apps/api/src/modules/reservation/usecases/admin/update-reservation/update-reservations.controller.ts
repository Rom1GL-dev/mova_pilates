import { Body, Controller, Put, Req, UseGuards } from '@nestjs/common';
import { routesV1 } from '../../../../../config/app.routes';
import { AuthGuard } from '../../../../../shared/applications/guards/auth.guard';
import { UpdateReservationsDto } from './update-reservations.dto';
import { AuthenticatedRequest } from '../../../../../types/auth-request';
import { UpdateReservationsService } from './update-reservations.service';
import { Roles, RolesGuard } from '../../../../auth/config/role.guard';
import { Role } from '@mova_pilates/shared';

@Controller(routesV1.version)
export class UpdateReservationsController {
  constructor(
    private readonly updateReservationservice: UpdateReservationsService,
  ) {}

  @Put(routesV1.backoffice.reservations.root)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.enum.ADMIN)
  async execute(
    @Body() updatePackDto: UpdateReservationsDto,
    @Req() request: AuthenticatedRequest,
  ) {
    const reservation = await this.updateReservationservice.execute(
      updatePackDto,
      request.session.user,
    );

    return { reservation: reservation };
  }
}
