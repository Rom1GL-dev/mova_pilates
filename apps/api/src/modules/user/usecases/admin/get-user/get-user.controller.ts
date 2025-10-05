import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { routesV1 } from '../../../../../config/app.routes';
import { GetUserService } from './get-user.service';
import { Roles, RolesGuard } from '../../../../auth/config/role.guard';
import { Role } from '@mova_pilates/shared';

@Controller(routesV1.version)
@UseGuards(RolesGuard)
export class GetUserController {
  constructor(private readonly listUsersService: GetUserService) {}

  @Get(routesV1.backoffice.users.byId)
  @Roles(Role.enum.ADMIN)
  async getUser(@Param('id') id: string) {
    const user = await this.listUsersService.execute(id);

    return { user: user };
  }
}
