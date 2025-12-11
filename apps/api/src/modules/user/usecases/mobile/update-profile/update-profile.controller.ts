import { Body, Controller, Patch, Req, UseGuards } from '@nestjs/common';
import { routesV1 } from '../../../../../config/app.routes';
import { AuthGuard } from '../../../../../shared/applications/guards/auth.guard';
import { UpdateProfileDto } from './update-profile.dto';
import { AuthenticatedRequest } from '../../../../../types/auth-request';
import { UpdateProfileService } from './update-profile.service';
import {
  getSessionStorageKey,
  SESSION_TTL_MS,
} from '../../../../auth/config/storage';
import { CacheStorage } from '../../../../../shared/ports/cache-storage';

@Controller(routesV1.version)
export class UpdateProfileController {
  constructor(
    private readonly updateUserService: UpdateProfileService,
    private readonly cache: CacheStorage,
  ) {}

  @UseGuards(AuthGuard)
  @Patch(routesV1.mobile.profile.update)
  async execute(
    @Body() updateUserDto: UpdateProfileDto,
    @Req() request: AuthenticatedRequest,
  ) {
    const sessionUser = await this.updateUserService.execute(
      updateUserDto,
      request.session.user,
    );

    request.session.user = sessionUser;

    await this.cache.set(
      getSessionStorageKey(request.session.id),
      {
        id: request.session.id,
        user: sessionUser,
      },
      SESSION_TTL_MS,
    );

    return { user: sessionUser };
  }
}
