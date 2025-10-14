import { Module } from '@nestjs/common';
import { LogModule } from 'src/modules/logs/log.module';
import { SharedModule } from '../../shared/shared.module';
import { GetUserController } from './usecases/admin/get-user/get-user.controller';
import { GetUserService } from './usecases/admin/get-user/get-user.service';
import { LoginAdminController } from './usecases/admin/login-admin/login-admin.controller';
import { LoginAdminService } from './usecases/admin/login-admin/login-admin.service';
import { LogoutController } from './usecases/admin/logout/logout.controller';
import { LogoutService } from './usecases/admin/logout/logout.service';
import { RegisterController } from './usecases/admin/register/register.controller';
import { RegisterService } from './usecases/admin/register/register.service';
import { LoginController } from './usecases/mobile/login/login.controller';
import { LoginService } from './usecases/mobile/login/login.service';

@Module({
  imports: [SharedModule, LogModule],
  providers: [
    GetUserService,
    LoginService,
    LogoutService,
    RegisterService,
    LoginAdminService,
  ],
  controllers: [
    GetUserController,
    LoginController,
    LogoutController,
    RegisterController,
    LoginAdminController,
  ],
  exports: [],
})
export class AuthModule {}
