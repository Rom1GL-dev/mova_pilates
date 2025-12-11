import { Role } from '@mova_pilates/shared';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { routesV1 } from 'src/config/app.routes';
import { AuthGuard } from 'src/shared/applications/guards/auth.guard';
import { AuthenticatedRequest } from '../../../../types/auth-request';
import { Roles, RolesGuard } from '../../../auth/config/role.guard';
import { CreateLogDto } from './create-log.dto';
import { CreateLogService } from './create-log.service';

@Controller(routesV1.version)
export class CreateLogController {
  constructor(private readonly createLogService: CreateLogService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.enum.ADMIN)
  @Post(routesV1.backoffice.logs.root)
  async create(
    @Body() createPackDto: CreateLogDto,
    @Req() request: AuthenticatedRequest,
  ) {
    const log = await this.createLogService.execute(
      createPackDto,
      request.session.user.id,
    );
    return { log: log };
  }
}
