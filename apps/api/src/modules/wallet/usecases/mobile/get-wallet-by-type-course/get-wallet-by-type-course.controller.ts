import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { routesV1 } from '../../../../../config/app.routes';
import { GetWalletByTypeCourseService } from './get-wallet-by-type-course.service';
import { AuthGuard } from '../../../../../shared/applications/guards/auth.guard';
import { AuthenticatedRequest } from '../../../../../types/auth-request';

@Controller(routesV1.version)
export class GetWalletByTypeCourseController {
  constructor(
    private readonly getWalletByTypeCourseService: GetWalletByTypeCourseService,
  ) {}

  @UseGuards(AuthGuard)
  @Get(routesV1.mobile.wallets.byTypeCourseId)
  async getWalletByTypeCourse(
    @Req() request: AuthenticatedRequest,
    @Param('typeCourseId') typeCourseId: string,
  ) {
    const wallets = await this.getWalletByTypeCourseService.execute(
      typeCourseId,
      request.session.user,
    );

    return { wallets: wallets };
  }
}
