import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdjustCreditDto } from './adjust-credit.dto';
import { Session } from '../../../../types/session';
import { WalletRepository } from '../../domain/repositories/wallet.repository';
import { Wallet } from '../../domain/entities/wallet.entity';

@Injectable()
export class AdjustCreditService {
  constructor(private readonly walletRepository: WalletRepository) {}

  async execute(data: AdjustCreditDto, user: Session['user']) {
    if (!user) {
      throw new UnauthorizedException(
        'Demande non autorisée. Veuillez vous connecter.',
      );
    }

    const adjustCreditToSave: Wallet = {
      userId: data.userId,
      typeCourseId: data.typeCourseId,
      balance: data.balance,
    };

    const adjustCreditRaw =
      await this.walletRepository.adjustCredit(adjustCreditToSave);

    if (!adjustCreditRaw) {
      throw new Error("Le crédit n'a pas pu être modifié.");
    }
    return { message: 'Le crédit a bien été modifié.' };
  }
}
