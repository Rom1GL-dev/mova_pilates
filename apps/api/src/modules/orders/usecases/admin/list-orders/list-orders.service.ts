import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../../../domain/repositories/order.repository';

@Injectable()
export class ListOrdersService {
  constructor(private readonly orderRepository: OrderRepository) {}

  execute() {
    return this.orderRepository.findAll();
  }
}
