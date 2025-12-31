import { Module } from '@nestjs/common';

import { SharedModule } from '../../shared/shared.module';
import { ListAllWalletsByUserMobileService } from './usecases/mobile/list-all-wallets-by-user-mobile/list-all-wallets-by-user-mobile.service';
import { ListAllWalletsByUserMobileController } from './usecases/mobile/list-all-wallets-by-user-mobile/list-all-wallets-by-user-mobile.controller';
import { WalletRepository } from './domain/repositories/wallet.repository';
import { WalletPrismaRepository } from './infrastructure/repositories/wallet.prisma.repository';
import { AdjustCreditService } from './usecases/admin/adjust-credit/adjust-credit.service';
import { AdjustCreditController } from './usecases/admin/adjust-credit/adjust-credit.controller';
import { LogModule } from '../logs/log.module';
import { ListAllWalletsByUserService } from './usecases/admin/list-all-wallets-by-user/list-all-wallets-by-user.service';
import { ListAllWalletsByUserController } from './usecases/admin/list-all-wallets-by-user/list-all-wallets-by-user.controller';
import { GetWalletByTypeCourseService } from './usecases/mobile/get-wallet-by-type-course/get-wallet-by-type-course.service';
import { GetWalletByTypeCourseController } from './usecases/mobile/get-wallet-by-type-course/get-wallet-by-type-course.controller';

@Module({
  imports: [SharedModule, LogModule],
  providers: [
    ListAllWalletsByUserService,
    AdjustCreditService,
    ListAllWalletsByUserMobileService,
    GetWalletByTypeCourseService,
    {
      provide: WalletRepository,
      useClass: WalletPrismaRepository,
    },
  ],
  controllers: [
    ListAllWalletsByUserController,
    AdjustCreditController,
    ListAllWalletsByUserMobileController,
    GetWalletByTypeCourseController,
  ],
  exports: [],
})
export class WalletModule {}
