import { Module } from '@nestjs/common';
import { SharedModule } from '../../shared/shared.module';
import { GetUserService } from './usecases/get-user/get-user.service';
import { GetUserController } from './usecases/get-user/get-user.controller';
import { LoginController } from './usecases/login/login.controller';
import { LogoutController } from './usecases/logout/logout.controller';
import { LoginService } from './usecases/login/login.service';
import { LogoutService } from './usecases/logout/logout.service';
import { RegisterService } from './usecases/register/register.service';
import { RegisterController } from './usecases/register/register.controller';
import { LoginAdminService } from './usecases/login-admin/login-admin.service';
import { LoginAdminController } from './usecases/login-admin/login-admin.controller';

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
