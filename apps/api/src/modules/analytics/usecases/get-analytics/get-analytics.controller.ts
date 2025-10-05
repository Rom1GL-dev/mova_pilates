import { Controller, Get, UseGuards } from '@nestjs/common';
import { routesV1 } from '../../../../config/app.routes';
import { GetAnalyticsService } from './get-analytics.service';
import { Roles, RolesGuard } from '../../../auth/config/role.guard';
import { Role } from '@mova_pilates/shared';

@Controller(routesV1.version)
@UseGuards(RolesGuard)
export class GetAnalyticsController {
  constructor(private readonly getAnalyticsService: GetAnalyticsService) {}

  @Get(routesV1.backoffice.analytics.root)
  @Roles(Role.enum.ADMIN)
  async getAnalytics() {
    const analytics = await this.getAnalyticsService.execute();

    return { analytics: analytics };
  }
}
