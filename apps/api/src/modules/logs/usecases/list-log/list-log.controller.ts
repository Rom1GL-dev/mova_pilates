import { Controller, Get, UseGuards } from '@nestjs/common';
import { routesV1 } from '../../../../config/app.routes';
import { ListLogService } from './list-log.service';
import { Roles, RolesGuard } from '../../../auth/config/role.guard';
import { Role } from '@mova_pilates/shared';
import { AuthGuard } from '../../../../shared/applications/guards/auth.guard';

@Controller(routesV1.version)
export class ListLogController {
  constructor(private readonly listLog: ListLogService) {}

  @Get(routesV1.backoffice.logs.root)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.enum.ADMIN)
  async list() {
    const logs = await this.listLog.execute();

    return { logs: logs };
  }
}
