import { Body, Controller, Post } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
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
  @Throttle({ default: { limit: 3, ttl: 60000 } }) // 3 demandes par minute
  requestReset(@Body() body: ForgotPasswordEmailDto) {
    return this.forgotPasswordService.requestPasswordReset(body);
  }

  @Post(routesV1.mobile.auth.forgotPasswordVerify)
  @Throttle({ default: { limit: 5, ttl: 60000 } }) // 5 tentatives par minute
  verifyOtp(@Body() body: ForgotPasswordVerifyDto) {
    return this.forgotPasswordService.verifyAndReset(body);
  }
}
