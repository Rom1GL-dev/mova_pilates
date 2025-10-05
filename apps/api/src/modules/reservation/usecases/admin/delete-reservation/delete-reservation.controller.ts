import { Body, Controller, Delete, Req, UseGuards } from '@nestjs/common';
import { routesV1 } from '../../../../../config/app.routes';
import { DeleteReservationDto } from './delete-reservation.dto';
import { AuthenticatedRequest } from '../../../../../types/auth-request';
import { DeleteReservationService } from './delete-reservation.service';
import { AuthGuard } from '../../../../../shared/applications/guards/auth.guard';
import { Roles, RolesGuard } from '../../../../auth/config/role.guard';
import { Role } from '@mova_pilates/shared';

@Controller(routesV1.version)
export class DeleteReservationController {
  constructor(
    private readonly deleteReservationService: DeleteReservationService,
  ) {}

  @Delete(routesV1.backoffice.reservations.root)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.enum.ADMIN)
  async delete(
    @Body() deleteReservationDto: DeleteReservationDto,
    @Req() request: AuthenticatedRequest,
  ) {
    const reservation = await this.deleteReservationService.execute(
      deleteReservationDto,
      request.session.user,
    );

    return { reservation: reservation };
  }
}
