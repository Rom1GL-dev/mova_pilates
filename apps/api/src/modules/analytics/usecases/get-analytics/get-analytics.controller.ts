import { Controller, Get, UseGuards } from '@nestjs/common';
import { routesV1 } from '../../../../config/app.routes';
import { GetAnalyticsService } from './get-analytics.service';
import { Roles, RolesGuard } from '../../../auth/config/role.guard';
import { Role } from '@mova_pilates/shared';
import { AuthGuard } from '../../../../shared/applications/guards/auth.guard';

@Controller(routesV1.version)
export class GetAnalyticsController {
  constructor(private readonly getAnalyticsService: GetAnalyticsService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.enum.ADMIN)
  @Get(routesV1.backoffice.analytics.root)
  async getAnalytics() {
    const analytics = await this.getAnalyticsService.execute();

    return { analytics: analytics };
  }
}
