import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { routesV1 } from '../../../../../config/app.routes';
import { GetCsrfTokenService } from './get-csrf-token.service';

@Controller(routesV1.version)
export class GetCsrfTokenController {
  constructor(
    private readonly getCsrfTokenService: GetCsrfTokenService,
  ) {}

  @Get(routesV1.backoffice.auth.csrfToken)
  async getCsrfToken(@Req() req: Request) {
    const sessionId = req.session?.id;
    if (!sessionId) {
      throw new Error('No session found');
    }

    const token = await this.getCsrfTokenService.execute(sessionId);

    return { csrfToken: token };
  }
}
