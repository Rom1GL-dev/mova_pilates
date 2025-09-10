import { Body, Controller, Put, Req, UseGuards } from '@nestjs/common';
import { routesV1 } from '../../../../config/app.routes';
import { AuthGuard } from '../../../../shared/applications/guards/auth.guard';
import { UpdateSessionDto } from './update-session.dto';
import { AuthenticatedRequest } from '../../../../types/auth-request';
import { UpdateSessionService } from './update-session.service';
import { Roles, RolesGuard } from '../../../auth/config/role.guard';
import { Role } from '@mova_pilates/shared';

@Controller(routesV1.version)
export class UpdateSessionController {
  constructor(private readonly updateSessionService: UpdateSessionService) {}

  @Put(routesV1.sessions.root)
  @UseGuards(AuthGuard)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.enum.ADMIN)
  async execute(
    @Body() updateSessionDto: UpdateSessionDto,
    @Req() request: AuthenticatedRequest,
  ) {
    const session = await this.updateSessionService.execute(
      updateSessionDto,
      request.session.user,
    );

    return { session: session };
  }
}
