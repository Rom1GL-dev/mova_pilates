import { Body, Controller, Patch, Req, UseGuards } from '@nestjs/common';
import { routesV1 } from '../../../../../config/app.routes';
import { AuthGuard } from '../../../../../shared/applications/guards/auth.guard';
import { AdjustCreditDto } from './adjust-credit.dto';
import { AuthenticatedRequest } from '../../../../../types/auth-request';
import { AdjustCreditService } from './adjust-credit.service';
import { Roles, RolesGuard } from '../../../../auth/config/role.guard';
import { Role } from '@mova_pilates/shared';

@Controller(routesV1.version)
export class AdjustCreditController {
  constructor(private readonly adjustCreditService: AdjustCreditService) {}

  @Patch(routesV1.backoffice.wallets.adjustCredit)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.enum.ADMIN)
  async execute(
    @Body() updateTypeCourseDto: AdjustCreditDto,
    @Req() request: AuthenticatedRequest,
  ) {
    const wallets = await this.adjustCreditService.execute(
      updateTypeCourseDto,
      request.session.user,
    );

    return { wallets: wallets };
  }
}
