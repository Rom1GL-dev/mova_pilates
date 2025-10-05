import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { routesV1 } from 'src/config/app.routes';
import { AuthGuard } from 'src/shared/applications/guards/auth.guard';
import { CreateSessionDto } from './create-session.dto';
import { AuthenticatedRequest } from '../../../../../types/auth-request';
import { CreateSessionService } from './create-session.service';
import { Roles, RolesGuard } from '../../../../auth/config/role.guard';
import { Role } from '@mova_pilates/shared';

@Controller(routesV1.version)
export class CreateSessionController {
  constructor(private readonly createSessionService: CreateSessionService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.enum.ADMIN)
  @Post(routesV1.backoffice.sessions.root)
  async create(
    @Body() createSessionDto: CreateSessionDto,
    @Req() request: AuthenticatedRequest,
  ) {
    const session = await this.createSessionService.execute(
      createSessionDto,
      request.session.user,
    );
    return { session: session };
  }
}
