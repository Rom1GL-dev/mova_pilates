import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { routesV1 } from '../../../../config/app.routes';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { getCookiesOptions } from '../../../../shared/utils/cookies';
import { RegisterDto } from './register.dto';
import { RegisterService } from './register.service';

@Controller(routesV1.version)
export class RegisterController {
  constructor(
    private readonly registerService: RegisterService,
    private readonly configService: ConfigService,
  ) {}

  @Post(routesV1.auth.register)
  async registerUser(@Body() registerDto: RegisterDto, @Res() res: Response) {
    const result = await this.registerService.register(registerDto);
    this.setCookie(res, result.sessionId);
    res.status(HttpStatus.CREATED).json({
      account: result.user,
    });
  }

  private setCookie(res: Response, sessionId: string) {
    res.cookie('sessionId', sessionId, getCookiesOptions(this.configService));
  }
}
