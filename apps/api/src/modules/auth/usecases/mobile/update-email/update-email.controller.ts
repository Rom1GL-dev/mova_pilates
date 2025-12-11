import { Body, Controller, Patch, Req, UseGuards } from '@nestjs/common';
import { routesV1 } from '../../../../../config/app.routes';
import { AuthGuard } from '../../../../../shared/applications/guards/auth.guard';
import { AuthenticatedRequest } from '../../../../../types/auth-request';
import { UpdateEmailService } from './update-email.service';
import { UpdateEmailDto } from './update-email.dto';
import { CacheStorage } from '../../../../../shared/ports/cache-storage';

@Controller(routesV1.version)
export class UpdateEmailController {
  constructor(
    private readonly updateEmailService: UpdateEmailService,
    private readonly cache: CacheStorage,
  ) {}

  @UseGuards(AuthGuard)
  @Patch(routesV1.mobile.profile.updateEmail)
  async execute(
    @Body() body: UpdateEmailDto,
    @Req() request: AuthenticatedRequest,
  ) {
    const sessionUser = await this.updateEmailService.execute(
      body,
      request.session.user,
    );

    return { user: sessionUser };
  }
}
