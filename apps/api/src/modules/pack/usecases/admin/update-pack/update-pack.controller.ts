import { Body, Controller, Put, Req, UseGuards } from '@nestjs/common';
import { routesV1 } from '../../../../../config/app.routes';
import { AuthGuard } from '../../../../../shared/applications/guards/auth.guard';
import { UpdatePackDto } from './update-pack.dto';
import { AuthenticatedRequest } from '../../../../../types/auth-request';
import { UpdatePackService } from './update-pack.service';
import { Roles, RolesGuard } from '../../../../auth/config/role.guard';
import { Role } from '@mova_pilates/shared';

@Controller(routesV1.version)
export class UpdatePackController {
  constructor(private readonly updatePackService: UpdatePackService) {}

  @Put(routesV1.backoffice.packs.root)
  @UseGuards(AuthGuard)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.enum.ADMIN)
  async execute(
    @Body() updatePackDto: UpdatePackDto,
    @Req() request: AuthenticatedRequest,
  ) {
    const pack = await this.updatePackService.execute(
      updatePackDto,
      request.session.user,
    );

    return { pack: pack };
  }
}
