import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';
import { SessionMiddleware } from './modules/auth/middlewares/session.middleware';
import { CsrfMiddleware } from './modules/auth/middlewares/csrf.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { RolesGuard } from './modules/auth/config/role.guard';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { CustomThrottlerGuard } from './shared/guards/custom-throttler.guard';
import { TypeCourseModule } from './modules/type-course/type-course.module';
import { PackModule } from './modules/pack/pack.module';
import { SessionModule } from './modules/session/session.module';
import { ReservationModule } from './modules/reservation/reservation.module';
import { WalletModule } from './modules/wallet/wallet.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { LogModule } from './modules/logs/log.module';
import { ImagesModule } from './modules/images/images.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { OrderModule } from './modules/orders/order.module';
import { LegalModule } from './modules/legal/legal.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 3,
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 20,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 100,
      },
    ]),
    SharedModule,
    LogModule,
    AuthModule,
    UserModule,
    TypeCourseModule,
    PackModule,
    SessionModule,
    ReservationModule,
    WalletModule,
    AnalyticsModule,
    ImagesModule,
    PaymentsModule,
    OrderModule,
    LegalModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: CustomThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SessionMiddleware)
      .forRoutes('*')
      .apply(CsrfMiddleware)
      .forRoutes('*');
  }
}
