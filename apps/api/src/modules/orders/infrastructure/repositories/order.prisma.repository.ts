import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/infrastructure/prisma.service';
import { OrderRepository } from '../../domain/repositories/order.repository';
import { Order } from '../../domain/entities/order.entity';

@Injectable()
export class OrderPrismaRepository implements OrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({
      include: {
        user: true,
        pack: true,
      },
    });

    return orders.map((log) => ({
      id: log.id,
      userFullName: `${log.user.firstname} ${log.user.lastname}`,
      packName: log.pack.label,
      amount: log.amount,
      status: log.status,
      createdAt: log.createdAt,
    }));
  }

  async findByUserId(userId: string): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({
      where: { userId },
      include: {
        user: true,
        pack: true,
      },
    });

    return orders.map((log) => ({
      id: log.id,
      userFullName: `${log.user.firstname} ${log.user.lastname}`,
      packName: log.pack.label,
      amount: log.amount,
      status: log.status,
      createdAt: log.createdAt,
    }));
  }
}
