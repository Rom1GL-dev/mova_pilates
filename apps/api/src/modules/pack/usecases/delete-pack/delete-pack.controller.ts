import { Body, Controller, Delete, Req, UseGuards } from '@nestjs/common';
import { routesV1 } from '../../../../config/app.routes';
import { DeletePackDto } from './delete-pack.dto';
import { AuthenticatedRequest } from '../../../../types/auth-request';
import { DeletePackService } from './delete-pack.service';
import { AuthGuard } from '../../../../shared/applications/guards/auth.guard';
import { Roles, RolesGuard } from '../../../auth/config/role.guard';
import { Role } from '@mova_pilates/shared';

@Controller(routesV1.version)
export class DeletePackController {
  constructor(private readonly deletePackService: DeletePackService) {}

  @Delete(routesV1.packs.root)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.enum.ADMIN)
  async delete(
    @Body() deletePackDto: DeletePackDto,
    @Req() request: AuthenticatedRequest,
  ) {
    const pack = await this.deletePackService.execute(
      deletePackDto,
      request.session.user,
    );

    return { pack: pack };
  }
}
