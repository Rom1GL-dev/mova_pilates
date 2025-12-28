import { Module } from '@nestjs/common';

import { SharedModule } from '../../shared/shared.module';
import { ListOrdersController } from './usecases/list-orders/list-orders.controller';
import { OrderRepository } from './domain/repositories/order.repository';
import { OrderPrismaRepository } from './infrastructure/repositories/order.prisma.repository';
import { ListOrdersService } from './usecases/list-orders/list-orders.service';
import { ListOrdersByUserAdminService } from './usecases/list-orders-by-user-admin/list-orders-by-user-admin.service';
import { ListOrdersByUserAdminController } from './usecases/list-orders-by-user-admin/list-orders-by-user-admin.controller';

@Module({
  imports: [SharedModule],
  providers: [
    ListOrdersService,
    ListOrdersByUserAdminService,
    {
      provide: OrderRepository,
      useClass: OrderPrismaRepository,
    },
  ],
  controllers: [ListOrdersController, ListOrdersByUserAdminController],
})
export class OrderModule {}
