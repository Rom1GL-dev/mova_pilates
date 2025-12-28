import { Controller, Get } from '@nestjs/common';
import { routesV1 } from '../../../../config/app.routes';
import { ListOrdersService } from './list-orders.service';

@Controller(routesV1.version)
export class ListOrdersController {
  constructor(private readonly listOrdersService: ListOrdersService) {}

  @Get(routesV1.backoffice.orders.root)
  async list() {
    const orders = await this.listOrdersService.execute();

    return { orders: orders };
  }
}
