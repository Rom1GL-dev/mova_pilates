import { Injectable } from '@nestjs/common';
import { WalletRepository } from '../../domain/repositories/wallet.repository';
import { PrismaService } from '../../../../shared/infrastructure/prisma.service';
import { Wallet } from '../../domain/entities/wallet.entity';

@Injectable()
export class WalletPrismaRepository implements WalletRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllWalletsByUser(
    userId: string,
  ): Promise<{ typeCourseId: string; label: string; balance: number }[]> {
    const courses = await this.prisma.typeCourse.findMany();

    const wallets = await this.prisma.wallet.findMany({
      where: { userId },
    });

    return courses.map((course) => {
      const wallet = wallets.find((w) => w.typeCourseId === course.id);
      return {
        typeCourseId: course.id,
        label:
          course.label +
          ' - ' +
          (course.capacity > 1 ? 'Collectif' : 'Individuel'),
        balance: wallet ? wallet.balance : 0,
      };
    });
  }

  async adjustCredit(data: Wallet): Promise<Wallet> {
    return this.prisma.wallet.upsert({
      where: {
        userId_typeCourseId: {
          userId: data.userId,
          typeCourseId: data.typeCourseId,
        },
      },
      create: {
        userId: data.userId,
        typeCourseId: data.typeCourseId,
        balance: data.balance,
      },
      update: {
        balance: data.balance,
      },
    });
  }
}
