import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { routesV1 } from '../../../../../config/app.routes';
import { GetPackService } from './get-pack.service';
import { Roles, RolesGuard } from '../../../../auth/config/role.guard';
import { Role } from '@mova_pilates/shared';

@Controller(routesV1.version)
@UseGuards(RolesGuard)
export class GetPackController {
  constructor(private readonly getPackService: GetPackService) {}

  @Get(routesV1.backoffice.packs.byId)
  @Roles(Role.enum.ADMIN)
  async getPack(@Param('id') id: string) {
    const pack = await this.getPackService.execute(id);

    return { pack: pack };
  }
}
