import { Controller, Get, UseGuards } from '@nestjs/common';
import { routesV1 } from '../../../../config/app.routes';
import { ListUsersService } from './list-users.service';
import { Roles, RolesGuard } from '../../../auth/config/role.guard';
import { Role } from '@mova_pilates/shared';

@Controller(routesV1.version)
@UseGuards(RolesGuard)
export class ListUsersController {
  constructor(private readonly listUsersService: ListUsersService) {}

  @Get(routesV1.users.root)
  @Roles(Role.enum.ADMIN)
  async listUsers() {
    const users = await this.listUsersService.execute();

    return { users: users };
  }
}
