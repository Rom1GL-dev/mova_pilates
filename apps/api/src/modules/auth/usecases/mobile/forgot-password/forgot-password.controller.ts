import { Body, Controller, Post } from '@nestjs/common';
import { ForgotPasswordService } from './forgot-password.service';
import {
  ForgotPasswordEmailDto,
  ForgotPasswordVerifyDto,
} from './forgot-password.dto';
import { routesV1 } from '../../../../../config/app.routes';

@Controller(routesV1.version)
export class ForgotPasswordController {
  constructor(private readonly forgotPasswordService: ForgotPasswordService) {}

  @Post(routesV1.mobile.auth.forgotPassword)
  requestReset(@Body() body: ForgotPasswordEmailDto) {
    return this.forgotPasswordService.requestPasswordReset(body);
  }

  @Post(routesV1.mobile.auth.forgotPasswordVerify)
  verifyOtp(@Body() body: ForgotPasswordVerifyDto) {
    return this.forgotPasswordService.verifyAndReset(body);
  }
}
