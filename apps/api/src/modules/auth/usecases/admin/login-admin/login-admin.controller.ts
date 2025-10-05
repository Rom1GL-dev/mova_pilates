import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { routesV1 } from '../../../../../config/app.routes';
import { LoginDto } from './login.dto';
import { Response } from 'express';
import { getCookiesOptions } from '../../../../../shared/utils/cookies';
import { ConfigService } from '@nestjs/config';
import { LoginAdminService } from './login-admin.service';

@Controller(routesV1.version)
export class LoginAdminController {
  constructor(
    private readonly loginAdminService: LoginAdminService,
    private readonly configService: ConfigService,
  ) {}

  @Post(routesV1.backoffice.auth.adminLogin)
  async loginUser(@Body() loginDto: LoginDto) {
    return this.loginAdminService.login(loginDto);
  }

  @Post(routesV1.backoffice.auth.verifyOtp)
  async verifyOtp(
    @Body() body: { email: string; otp: string },
    @Res() res: Response,
  ) {
    const result = await this.loginAdminService.verifyOtp(body.email, body.otp);

    this.setCookie(res, result.sessionId);

    res.status(HttpStatus.OK).json({
      account: result.user,
    });
  }

  private setCookie(res: Response, sessionId: string) {
    res.cookie(
      'sessionId_admin',
      sessionId,
      getCookiesOptions(this.configService),
    );
  }
}
