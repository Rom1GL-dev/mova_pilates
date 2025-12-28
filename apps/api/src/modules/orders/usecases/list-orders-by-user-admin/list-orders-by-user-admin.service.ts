import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../../domain/repositories/order.repository';

@Injectable()
export class ListOrdersByUserAdminService {
  constructor(private readonly orderRepository: OrderRepository) {}

  execute(userId: string) {
    return this.orderRepository.findByUserId(userId);
  }
}
