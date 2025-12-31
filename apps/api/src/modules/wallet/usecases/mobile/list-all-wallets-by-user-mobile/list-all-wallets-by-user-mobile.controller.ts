import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { routesV1 } from '../../../../../config/app.routes';
import { ListAllWalletsByUserMobileService } from './list-all-wallets-by-user-mobile.service';
import { AuthGuard } from '../../../../../shared/applications/guards/auth.guard';
import { AuthenticatedRequest } from '../../../../../types/auth-request';

@Controller(routesV1.version)
export class ListAllWalletsByUserMobileController {
  constructor(
    private readonly listAllWalletsByUserMobileService: ListAllWalletsByUserMobileService,
  ) {}

  @UseGuards(AuthGuard)
  @Get(routesV1.mobile.wallets.byUserId)
  async listAllWalletsByUser(@Req() request: AuthenticatedRequest) {
    const wallets = await this.listAllWalletsByUserMobileService.execute(
      request.session.user,
    );

    return { wallets: wallets };
  }
}
