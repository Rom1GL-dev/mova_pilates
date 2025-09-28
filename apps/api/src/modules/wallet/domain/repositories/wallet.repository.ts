import { Injectable } from '@nestjs/common';
import { Wallet } from '../entities/wallet.entity';

@Injectable()
export abstract class WalletRepository {
  abstract findAllWalletsByUser(
    userId: string,
  ): Promise<{ typeCourseId: string; label: string; balance: number }[]>;
  abstract adjustCredit(data: Wallet): Promise<Wallet>;
}
