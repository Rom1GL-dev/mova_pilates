import { Module } from '@nestjs/common';
import { SharedModule } from '../../shared/shared.module';
import { GetUserService } from './usecases/admin/get-user/get-user.service';
import { GetUserController } from './usecases/admin/get-user/get-user.controller';
import { LoginController } from './usecases/mobile/login/login.controller';
import { LogoutController } from './usecases/admin/logout/logout.controller';
import { LoginService } from './usecases/mobile/login/login.service';
import { LogoutService } from './usecases/admin/logout/logout.service';
import { RegisterService } from './usecases/admin/register/register.service';
import { RegisterController } from './usecases/admin/register/register.controller';
import { LoginAdminService } from './usecases/admin/login-admin/login-admin.service';
import { LoginAdminController } from './usecases/admin/login-admin/login-admin.controller';

@Module({
  imports: [SharedModule],
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
