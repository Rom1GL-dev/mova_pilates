import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { routesV1 } from 'src/config/app.routes';
import { AuthGuard } from 'src/shared/applications/guards/auth.guard';
import { CreateReservationDto } from './create-reservation.dto';
import { AuthenticatedRequest } from '../../../../types/auth-request';
import { CreateReservationService } from './create-reservation.service';
import { Roles, RolesGuard } from '../../../auth/config/role.guard';
import { Role } from '@mova_pilates/shared';

@Controller(routesV1.version)
export class CreateReservationController {
  constructor(
    private readonly createReservationService: CreateReservationService,
  ) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.enum.ADMIN)
  @Post(routesV1.reservations.root)
  async create(
    @Body() createPackDto: CreateReservationDto,
    @Req() request: AuthenticatedRequest,
  ) {
    const reservation = await this.createReservationService.execute(
      createPackDto,
      request.session.user,
    );
    return { reservation: reservation };
  }
}
