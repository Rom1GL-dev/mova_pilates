import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { routesV1 } from '../../../../config/app.routes';
import { GetSessionService } from './get-session.service';
import { Roles, RolesGuard } from '../../../auth/config/role.guard';
import { Role } from '@mova_pilates/shared';

@Controller(routesV1.version)
@UseGuards(RolesGuard)
export class GetSessionController {
  constructor(private readonly getSessionService: GetSessionService) {}

  @Get(routesV1.sessions.byId)
  @Roles(Role.enum.ADMIN)
  async getSession(@Param('id') id: string) {
    const session = await this.getSessionService.execute(id);

    return { session: session };
  }
}
