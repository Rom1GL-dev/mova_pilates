import { Injectable } from '@nestjs/common';
import { Order } from '../entities/order.entity';

@Injectable()
export abstract class OrderRepository {
  abstract findAll(): Promise<Order[]>;
  abstract findByUserId(userId: string): Promise<Order[]>;
}
