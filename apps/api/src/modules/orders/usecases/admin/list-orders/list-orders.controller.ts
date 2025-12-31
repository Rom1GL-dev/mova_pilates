import { Controller, Get, UseGuards } from '@nestjs/common';
import { routesV1 } from '../../../../../config/app.routes';
import { ListOrdersService } from './list-orders.service';
import { AuthGuard } from '../../../../../shared/applications/guards/auth.guard';
import { Roles, RolesGuard } from '../../../../auth/config/role.guard';
import { Role } from '@mova_pilates/shared';

@Controller(routesV1.version)
export class ListOrdersController {
  constructor(private readonly listOrdersService: ListOrdersService) {}

  @Get(routesV1.backoffice.orders.root)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.enum.ADMIN)
  async list() {
    const orders = await this.listOrdersService.execute();

    return { orders: orders };
  }
}
