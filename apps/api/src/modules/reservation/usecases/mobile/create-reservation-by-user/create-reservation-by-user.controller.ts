import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { routesV1 } from 'src/config/app.routes';
import { AuthGuard } from 'src/shared/applications/guards/auth.guard';
import { AuthenticatedRequest } from '../../../../../types/auth-request';
import { CreateReservationByUserDto } from './create-reservation-by-user.dto';
import { CreateReservationByUserService } from './create-reservation-by-user.service';

@Controller(routesV1.version)
export class CreateReservationByUserController {
  constructor(
    private readonly createReservationService: CreateReservationByUserService,
  ) {}

  @UseGuards(AuthGuard)
  @Post(routesV1.mobile.reservations.root)
  async create(
    @Body() createPackDto: CreateReservationByUserDto,
    @Req() request: AuthenticatedRequest,
  ) {
    const reservation = await this.createReservationService.execute(
      createPackDto,
      request.session.user,
    );
    return { reservation: reservation };
  }
}
