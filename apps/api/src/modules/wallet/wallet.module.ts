import { Module } from '@nestjs/common';

import { SharedModule } from '../../shared/shared.module';
import { ListAllWalletsByUserService } from './usecases/list-all-wallets-by-user/list-all-wallets-by-user.service';
import { ListAllWalletsByUserController } from './usecases/list-all-wallets-by-user/list-all-wallets-by-user.controller';
import { WalletRepository } from './domain/repositories/wallet.repository';
import { WalletPrismaRepository } from './infrastructure/repositories/wallet.prisma.repository';
import { AdjustCreditService } from './usecases/adjust-credit/adjust-credit.service';
import { AdjustCreditController } from './usecases/adjust-credit/adjust-credit.controller';

@Module({
  imports: [SharedModule],
  providers: [
    ListAllWalletsByUserService,
    AdjustCreditService,
    {
      provide: WalletRepository,
      useClass: WalletPrismaRepository,
    },
  ],
  controllers: [ListAllWalletsByUserController, AdjustCreditController],
  exports: [],
})
export class WalletModule {}
