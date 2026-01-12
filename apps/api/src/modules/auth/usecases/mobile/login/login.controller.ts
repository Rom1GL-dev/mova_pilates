import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { routesV1 } from '../../../../../config/app.routes';
import { LoginDto } from './login.dto';
import { Response } from 'express';
import { LoginService } from './login.service';

@Controller(routesV1.version)
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post(routesV1.mobile.auth.login)
  @Throttle({ default: { limit: 5, ttl: 60000 } }) // 5 tentatives par minute
  async loginUser(@Body() loginDto: LoginDto, @Res() res: Response) {
    const result = await this.loginService.login(loginDto);
    res.status(HttpStatus.OK).json({
      account: result.user,
      sessionId: result.sessionId,
    });
  }
}
