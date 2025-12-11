import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { routesV1 } from 'src/config/app.routes';
import { AuthGuard } from 'src/shared/applications/guards/auth.guard';
import { CreateUserDto } from './create-user.dto';
import { AuthenticatedRequest } from '../../../../../types/auth-request';
import { CreateUserService } from './create-user.service';
import { Roles, RolesGuard } from '../../../../auth/config/role.guard';
import { Role } from '@mova_pilates/shared';

@Controller(routesV1.version)
export class CreateUserController {
  constructor(private readonly createUserService: CreateUserService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.enum.ADMIN)
  @Post(routesV1.backoffice.users.root)
  async create(
    @Body() addUserDto: CreateUserDto,
    @Req() request: AuthenticatedRequest,
  ) {
    const users = await this.createUserService.execute(
      addUserDto,
      request.session.user,
    );
    return { users: users };
  }
}
