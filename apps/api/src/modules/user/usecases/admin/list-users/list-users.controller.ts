import { Controller, Get, UseGuards } from '@nestjs/common';
import { routesV1 } from '../../../../../config/app.routes';
import { ListUsersService } from './list-users.service';
import { Roles, RolesGuard } from '../../../../auth/config/role.guard';
import { Role } from '@mova_pilates/shared';
import { AuthGuard } from '../../../../../shared/applications/guards/auth.guard';

@Controller(routesV1.version)
@UseGuards(RolesGuard)
export class ListUsersController {
  constructor(private readonly listUsersService: ListUsersService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.enum.ADMIN)
  @Get(routesV1.backoffice.users.root)
  async listUsers() {
    const users = await this.listUsersService.execute();

    return { users: users };
  }
}
