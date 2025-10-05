import { Controller, Get, UseGuards } from '@nestjs/common';
import { routesV1 } from '../../../../../config/app.routes';
import { ListSessionService } from './list-session.service';
import { Roles, RolesGuard } from '../../../../auth/config/role.guard';
import { Role } from '@mova_pilates/shared';
import { AuthGuard } from '../../../../../shared/applications/guards/auth.guard';

@Controller(routesV1.version)
export class ListSessionController {
  constructor(private readonly listSessionService: ListSessionService) {}

  @Get(routesV1.backoffice.sessions.root)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.enum.ADMIN)
  async list() {
    const sessions = await this.listSessionService.execute();

    return { sessions: sessions };
  }
}
