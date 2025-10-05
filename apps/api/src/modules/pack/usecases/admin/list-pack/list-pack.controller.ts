import { Controller, Get, UseGuards } from '@nestjs/common';
import { routesV1 } from '../../../../../config/app.routes';
import { ListPackService } from './list-pack.service';
import { Roles, RolesGuard } from '../../../../auth/config/role.guard';
import { Role } from '@mova_pilates/shared';
import { AuthGuard } from '../../../../../shared/applications/guards/auth.guard';

@Controller(routesV1.version)
export class ListPackController {
  constructor(private readonly listPack: ListPackService) {}

  @Get(routesV1.backoffice.packs.root)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.enum.ADMIN)
  async list() {
    const packs = await this.listPack.execute();

    return { packs: packs };
  }
}
