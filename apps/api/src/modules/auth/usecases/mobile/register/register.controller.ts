import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { routesV1 } from '../../../../../config/app.routes';
import { Response } from 'express';
import { RegisterDto } from './register.dto';
import { RegisterService } from './register.service';

@Controller(routesV1.version)
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post(routesV1.mobile.auth.register)
  async registerUser(@Body() registerDto: RegisterDto, @Res() res: Response) {
    const result = await this.registerService.register(registerDto);
    res.status(HttpStatus.CREATED).json({
      account: result.user,
      sessionId: result.sessionId,
    });
  }
}
