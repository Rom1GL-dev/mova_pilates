import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { routesV1 } from '../../../../config/app.routes';
import { GetLogService } from './get-log.service';
import { Roles, RolesGuard } from '../../../auth/config/role.guard';
import { Role } from '@mova_pilates/shared';
import { AuthGuard } from '../../../../shared/applications/guards/auth.guard';

@Controller(routesV1.version)
export class GetLogController {
  constructor(private readonly getLogService: GetLogService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.enum.ADMIN)
  @Get(routesV1.backoffice.logs.byId)
  async get(@Param('id') id: string) {
    const logs = await this.getLogService.execute(id);

    return { logs: logs };
  }
}
