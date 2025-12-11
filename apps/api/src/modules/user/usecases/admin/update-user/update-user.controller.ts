import { Body, Controller, Put, Req, UseGuards } from '@nestjs/common';
import { routesV1 } from '../../../../../config/app.routes';
import { AuthGuard } from '../../../../../shared/applications/guards/auth.guard';
import { UpdateUserDto } from './update-user.dto';
import { AuthenticatedRequest } from '../../../../../types/auth-request';
import { UpdateUserService } from './update-user.service';
import { Roles, RolesGuard } from '../../../../auth/config/role.guard';
import { Role } from '@mova_pilates/shared';

@Controller(routesV1.version)
export class UpdateUserController {
  constructor(private readonly updateUserService: UpdateUserService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.enum.ADMIN)
  @Put(routesV1.backoffice.users.root)
  async execute(
    @Body() updateUserDto: UpdateUserDto,
    @Req() request: AuthenticatedRequest,
  ) {
    const user = await this.updateUserService.execute(
      updateUserDto,
      request.session.user,
    );

    return { user: user };
  }
}
