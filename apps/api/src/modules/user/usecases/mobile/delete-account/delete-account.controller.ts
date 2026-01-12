import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { routesV1 } from '../../../../../config/app.routes';
import { AuthGuard } from '../../../../../shared/applications/guards/auth.guard';
import { AuthenticatedRequest } from '../../../../../types/auth-request';
import { Response } from 'express';
import { DeleteAccountService } from './delete-account.service';
import { DeleteAccountDto } from './delete-account.dto';

@Controller(routesV1.version)
export class DeleteAccountController {
  constructor(private readonly deleteAccountService: DeleteAccountService) {}

  @UseGuards(AuthGuard)
  @Delete(routesV1.mobile.profile.delete)
  async deleteAccount(
    @Body() dto: DeleteAccountDto,
    @Req() req: AuthenticatedRequest,
    @Res() res: Response,
  ) {
    const result = await this.deleteAccountService.execute(
      dto,
      req.session.user,
      req.session.id,
    );

    res.clearCookie('session_id');
    res.status(HttpStatus.OK).json(result);
  }
}
