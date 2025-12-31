import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { routesV1 } from '../../config/app.routes';
import { LegalType, UpdateLegalDto } from './update-legal.dto';
import { LegalService } from './legal.service';
import { AuthGuard } from '../../shared/applications/guards/auth.guard';
import { Roles, RolesGuard } from '../auth/config/role.guard';
import { Role } from '@mova_pilates/shared';

@Controller(routesV1.version)
export class LegalController {
  constructor(private readonly legalService: LegalService) {}

  @Get(routesV1.backoffice.legals.type)
  async get(@Param('type') type: LegalType) {
    return await this.legalService.get(type);
  }

  @Get(routesV1.mobile.legals.type)
  async getMobile(@Param('type') type: LegalType) {
    console.log(await this.legalService.get(type));
    return await this.legalService.get(type);
  }

  @Post(routesV1.backoffice.legals.root)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.enum.ADMIN)
  async update(@Body() body: UpdateLegalDto) {
    return await this.legalService.update(body);
  }
}
