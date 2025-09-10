import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { routesV1 } from 'src/config/app.routes';
import { AuthGuard } from 'src/shared/applications/guards/auth.guard';
import { CreatePackDto } from './create-pack.dto';
import { AuthenticatedRequest } from '../../../../types/auth-request';
import { CreatePackService } from './create-pack.service';
import { Roles, RolesGuard } from '../../../auth/config/role.guard';
import { Role } from '@mova_pilates/shared';

@Controller(routesV1.version)
export class CreatePackController {
  constructor(private readonly createTypeCourseService: CreatePackService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.enum.ADMIN)
  @Post(routesV1.packs.root)
  async create(
    @Body() createPackDto: CreatePackDto,
    @Req() request: AuthenticatedRequest,
  ) {
    const pack = await this.createTypeCourseService.execute(
      createPackDto,
      request.session.user,
    );
    return { pack: pack };
  }
}
