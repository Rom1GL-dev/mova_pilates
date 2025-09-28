import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';
import { SessionMiddleware } from './modules/auth/middlewares/session.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { RolesGuard } from './modules/auth/config/role.guard';
import { APP_GUARD } from '@nestjs/core';
import { TypeCourseModule } from './modules/type-course/type-course.module';
import { PackModule } from './modules/pack/pack.module';
import { SessionModule } from './modules/session/session.module';
import { ReservationModule } from './modules/reservation/reservation.module';
import { WalletModule } from './modules/wallet/wallet.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SharedModule,
    AuthModule,
    UserModule,
    TypeCourseModule,
    PackModule,
    SessionModule,
    ReservationModule,
    WalletModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SessionMiddleware).forRoutes('*');
  }
}
