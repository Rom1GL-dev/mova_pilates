import { Injectable } from '@nestjs/common';
import { WalletRepository } from '../../../domain/repositories/wallet.repository';

@Injectable()
export class ListAllWalletsByUserService {
  constructor(private readonly walletRepository: WalletRepository) {}

  execute(userId: string) {
    return this.walletRepository.findAllWalletsByUser(userId);
  }
}
