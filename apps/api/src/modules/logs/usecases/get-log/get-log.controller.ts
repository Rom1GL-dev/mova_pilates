import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { routesV1 } from '../../../../config/app.routes';
import { GetLogService } from './get-log.service';
import { Roles, RolesGuard } from '../../../auth/config/role.guard';
import { Role } from '@mova_pilates/shared';

@Controller(routesV1.version)
@UseGuards(RolesGuard)
export class GetLogController {
  constructor(private readonly getLogService: GetLogService) {}

  @Get(routesV1.backoffice.logs.byId)
  @Roles(Role.enum.ADMIN)
  async get(@Param('id') id: string) {
    const logs = await this.getLogService.execute(id);

    return { logs: logs };
  }
}
