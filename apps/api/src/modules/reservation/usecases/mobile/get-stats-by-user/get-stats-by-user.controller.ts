import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { routesV1 } from '../../../../../config/app.routes';
import { GetStatsByUserService } from './get-stats-by-user.service';
import { AuthenticatedRequest } from '../../../../../types/auth-request';
import { AuthGuard } from '../../../../../shared/applications/guards/auth.guard';

@Controller(routesV1.version)
export class GetStatsByUserController {
  constructor(private readonly getStatsByUserService: GetStatsByUserService) {}

  @Get(routesV1.mobile.reservations.statsByUser)
  @UseGuards(AuthGuard)
  async getStats(@Req() req: AuthenticatedRequest) {
    const stats = await this.getStatsByUserService.execute(req.session.user.id);
    return { stats };
  }
}
