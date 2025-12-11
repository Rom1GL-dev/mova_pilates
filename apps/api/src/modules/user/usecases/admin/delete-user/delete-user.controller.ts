import { Body, Controller, Delete, Req, UseGuards } from '@nestjs/common';
import { routesV1 } from '../../../../../config/app.routes';
import { DeleteUserDto } from './delete-user.dto';
import { AuthenticatedRequest } from '../../../../../types/auth-request';
import { DeleteUserService } from './delete-user.service';
import { AuthGuard } from '../../../../../shared/applications/guards/auth.guard';
import { Roles, RolesGuard } from '../../../../auth/config/role.guard';
import { Role } from '@mova_pilates/shared';

@Controller(routesV1.version)
export class DeleteUserController {
  constructor(private readonly deleteUserService: DeleteUserService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.enum.ADMIN)
  @Delete(routesV1.backoffice.users.root)
  async delete(
    @Body() deleteUserDto: DeleteUserDto,
    @Req() request: AuthenticatedRequest,
  ) {
    const events = await this.deleteUserService.execute(
      deleteUserDto,
      request.session.user,
    );

    return { events: events };
  }
}
