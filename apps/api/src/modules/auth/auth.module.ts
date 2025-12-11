import { Module } from '@nestjs/common';
import { LogModule } from 'src/modules/logs/log.module';
import { SharedModule } from '../../shared/shared.module';
import { GetUserController } from './usecases/mobile/get-user/get-user.controller';
import { GetUserService } from './usecases/mobile/get-user/get-user.service';
import { LoginAdminController } from './usecases/admin/login-admin/login-admin.controller';
import { LoginAdminService } from './usecases/admin/login-admin/login-admin.service';
import { LogoutAdminController } from './usecases/admin/logout-admin/logout-admin.controller';
import { LogoutAdminService } from './usecases/admin/logout-admin/logout-admin.service';
import { RegisterController } from './usecases/mobile/register/register.controller';
import { RegisterService } from './usecases/mobile/register/register.service';
import { LoginController } from './usecases/mobile/login/login.controller';
import { LoginService } from './usecases/mobile/login/login.service';
import { GetAdminUserController } from './usecases/admin/get-admin-user/get-admin-user.controller';
import { GetAdminUserService } from './usecases/admin/get-admin-user/get-admin-user.service';
import { LogoutService } from './usecases/mobile/logout/logout.service';
import { LogoutController } from './usecases/mobile/logout/logout.controller';
import { UpdatePasswordController } from './usecases/mobile/update-password/update-password.controller';
import { UpdatePasswordService } from './usecases/mobile/update-password/update-password.service';
import { UpdateEmailController } from './usecases/mobile/update-email/update-email.controller';
import { UpdateEmailService } from './usecases/mobile/update-email/update-email.service';
import { ForgotPasswordService } from './usecases/mobile/forgot-password/forgot-password.service';
import { ForgotPasswordController } from './usecases/mobile/forgot-password/forgot-password.controller';

@Module({
  imports: [SharedModule, LogModule],
  providers: [
    GetUserService,
    LoginService,
    LogoutAdminService,
    LogoutService,
    RegisterService,
    LoginAdminService,
    GetAdminUserService,
    UpdatePasswordService,
    UpdateEmailService,
    ForgotPasswordService,
  ],
  controllers: [
    GetUserController,
    LoginController,
    LogoutAdminController,
    RegisterController,
    LoginAdminController,
    GetAdminUserController,
    LogoutController,
    UpdatePasswordController,
    UpdateEmailController,
    ForgotPasswordController,
  ],
  exports: [],
})
export class AuthModule {}
