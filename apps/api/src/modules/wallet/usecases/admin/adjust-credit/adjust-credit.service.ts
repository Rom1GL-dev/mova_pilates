import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdjustCreditDto } from './adjust-credit.dto';
import { Session } from '../../../../../types/session';
import { WalletRepository } from '../../../domain/repositories/wallet.repository';
import { Wallet } from '../../../domain/entities/wallet.entity';
import { CreateLogService } from '../../../../logs/usecases/create-log/create-log.service';
import { AppType, LogType } from '../../../../logs/domain/entities/log.entity';

@Injectable()
export class AdjustCreditService {
  constructor(
    private readonly walletRepository: WalletRepository,
    private readonly createLogService: CreateLogService,
  ) {}

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
    await this.createLogService.execute(
      {
        appType: AppType.ADMIN,
        logType: LogType.UPDATE,
        message: `Crédit : ${adjustCreditRaw.userId}`,
      },
      user,
    );
    return { message: 'Le crédit a bien été modifié.' };
  }
}
