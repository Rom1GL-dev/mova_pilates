import { Body, Controller, Delete, Req, UseGuards } from '@nestjs/common';
import { routesV1 } from '../../../../../config/app.routes';
import { DeleteSessionDto } from './delete-session.dto';
import { AuthenticatedRequest } from '../../../../../types/auth-request';
import { DeleteSessionService } from './delete-session.service';
import { AuthGuard } from '../../../../../shared/applications/guards/auth.guard';
import { Roles, RolesGuard } from '../../../../auth/config/role.guard';
import { Role } from '@mova_pilates/shared';

@Controller(routesV1.version)
export class DeleteSessionController {
  constructor(private readonly deleteSessionService: DeleteSessionService) {}

  @Delete(routesV1.backoffice.sessions.root)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.enum.ADMIN)
  async delete(
    @Body() deleteSessionDto: DeleteSessionDto,
    @Req() request: AuthenticatedRequest,
  ) {
    const session = await this.deleteSessionService.execute(
      deleteSessionDto,
      request.session.user,
    );

    return { session: session };
  }
}
