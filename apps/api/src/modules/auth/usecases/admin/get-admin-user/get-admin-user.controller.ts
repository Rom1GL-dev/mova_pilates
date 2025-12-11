import { Controller, Get, Req } from '@nestjs/common';
import { routesV1 } from '../../../../../config/app.routes';
import { AuthenticatedRequest } from '../../../../../types/auth-request';
import { GetAdminUserService } from './get-admin-user.service';

@Controller(routesV1.version)
export class GetAdminUserController {
  constructor(private readonly getAdminUserService: GetAdminUserService) {}

  @Get(routesV1.backoffice.auth.me)
  async getAdminUser(@Req() request: AuthenticatedRequest) {
    if (!request.session) {
      return { data: null };
    }
    const user = await this.getAdminUserService.getAdminUser(
      request.session.id,
    );

    return { user: user };
  }
}
