import { Injectable, UnauthorizedException } from '@nestjs/common';
import { WalletRepository } from '../../../domain/repositories/wallet.repository';
import { Session } from '../../../../../types/session';

@Injectable()
export class ListAllWalletsByUserMobileService {
  constructor(private readonly walletRepository: WalletRepository) {}

  execute(user: Session['user']) {
    if (!user) {
      throw new UnauthorizedException(
        'Demande non autorisée. Veuillez vous connecter.',
      );
    }
    return this.walletRepository.findAllWalletsByUser(user.id);
  }
}
