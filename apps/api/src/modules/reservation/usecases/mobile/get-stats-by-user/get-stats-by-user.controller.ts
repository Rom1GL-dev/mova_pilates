import { Controller, Get, Req } from '@nestjs/common';
import { routesV1 } from '../../../../../config/app.routes';
import { GetStatsByUserService } from './get-stats-by-user.service';
import { AuthenticatedRequest } from '../../../../../types/auth-request';

@Controller(routesV1.version)
export class GetStatsByUserController {
  constructor(private readonly getStatsByUserService: GetStatsByUserService) {}

  @Get(routesV1.mobile.reservations.statsByUser)
  // @UseGuards(AuthGuard, RolesGuard)
  // @Roles(Role.enum.USER)
  async getStats(@Req() req: AuthenticatedRequest) {
    const stats = await this.getStatsByUserService.execute(req.session.user.id);
    return { stats };
  }
}
