import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { routesV1 } from '../../../../../config/app.routes';
import { Response } from 'express';
import { RegisterDto } from './register.dto';
import { RegisterService } from './register.service';

@Controller(routesV1.version)
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post(routesV1.mobile.auth.register)
  @Throttle({ default: { limit: 3, ttl: 60000 } }) // 3 inscriptions par minute
  async registerUser(@Body() registerDto: RegisterDto, @Res() res: Response) {
    const result = await this.registerService.register(registerDto);
    res.status(HttpStatus.CREATED).json({
      account: result.user,
      sessionId: result.sessionId,
    });
  }
}
