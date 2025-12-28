import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { Role } from '@mova_pilates/shared';
import { routesV1 } from '../../../../config/app.routes';
import { AuthGuard } from '../../../../shared/applications/guards/auth.guard';
import { Roles, RolesGuard } from '../../../auth/config/role.guard';
import { ListOrdersByUserAdminService } from './list-orders-by-user-admin.service';

@Controller(routesV1.version)
export class ListOrdersByUserAdminController {
  constructor(
    private readonly listOrdersByUserAdminService: ListOrdersByUserAdminService,
  ) {}

  @Get(routesV1.backoffice.orders.byId)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.enum.ADMIN)
  async listByUser(@Param('id') userId: string) {
    const orders = await this.listOrdersByUserAdminService.execute(userId);

    return { orders: orders };
  }
}
