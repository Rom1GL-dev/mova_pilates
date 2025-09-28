import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { routesV1 } from '../../../../config/app.routes';
import { ListAllWalletsByUserService } from './list-all-wallets-by-user.service';
import { Roles, RolesGuard } from '../../../auth/config/role.guard';
import { Role } from '@mova_pilates/shared';
import { AuthGuard } from '../../../../shared/applications/guards/auth.guard';

@Controller(routesV1.version)
export class ListAllWalletsByUserController {
  constructor(
    private readonly listAllWalletsByUserService: ListAllWalletsByUserService,
  ) {}

  @Get(routesV1.wallets.byUserId)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.enum.ADMIN)
  async listAllWalletsByUser(@Param('userId') userId: string) {
    const wallets = await this.listAllWalletsByUserService.execute(userId);

    return { wallets: wallets };
  }
}
