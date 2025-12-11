import { Body, Controller, Patch, Req, UseGuards } from '@nestjs/common';
import { routesV1 } from '../../../../../config/app.routes';
import { AuthGuard } from '../../../../../shared/applications/guards/auth.guard';
import { AuthenticatedRequest } from '../../../../../types/auth-request';
import { UpdatePasswordService } from './update-password.service';
import { UpdatePasswordDto } from './update-password.dto';

@Controller(routesV1.version)
export class UpdatePasswordController {
  constructor(private readonly updatePasswordService: UpdatePasswordService) {}

  @UseGuards(AuthGuard)
  @Patch(routesV1.mobile.profile.updatePassword)
  async execute(
    @Body() body: UpdatePasswordDto,
    @Req() request: AuthenticatedRequest,
  ) {
    await this.updatePasswordService.execute(body, request.session.user);

    return { success: true };
  }
}
