import {
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { routesV1 } from '../../../../../config/app.routes';
import { AuthGuard } from '../../../../../shared/applications/guards/auth.guard';
import { AuthenticatedRequest } from '../../../../../types/auth-request';
import { Response } from 'express';
import { LogoutAdminService } from './logout-admin.service';

@Controller(routesV1.version)
export class LogoutAdminController {
  constructor(private readonly logoutService: LogoutAdminService) {}

  @UseGuards(AuthGuard)
  @Post(routesV1.backoffice.auth.logout)
  async logout(@Req() req: AuthenticatedRequest, @Res() res: Response) {
    await this.logoutService.logout(req.session.id);

    res.clearCookie('sessionId_admin');

    res.status(HttpStatus.NO_CONTENT).send();
  }
}
