import { Module } from '@nestjs/common';

import { SharedModule } from '../../shared/shared.module';
import { ListAllWalletsByUserService } from './usecases/admin/list-all-wallets-by-user/list-all-wallets-by-user.service';
import { ListAllWalletsByUserController } from './usecases/admin/list-all-wallets-by-user/list-all-wallets-by-user.controller';
import { WalletRepository } from './domain/repositories/wallet.repository';
import { WalletPrismaRepository } from './infrastructure/repositories/wallet.prisma.repository';
import { AdjustCreditService } from './usecases/admin/adjust-credit/adjust-credit.service';
import { AdjustCreditController } from './usecases/admin/adjust-credit/adjust-credit.controller';
import { LogModule } from '../logs/log.module';

@Module({
  imports: [SharedModule, LogModule],
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
