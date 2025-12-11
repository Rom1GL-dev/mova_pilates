import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { routesV1 } from '../../../../../config/app.routes';
import { Roles, RolesGuard } from '../../../../auth/config/role.guard';
import { Role } from '@mova_pilates/shared';
import { GetPacksByTypeCourseService } from './get-packs-by-type-course.service';
import { AuthGuard } from '../../../../../shared/applications/guards/auth.guard';

@Controller(routesV1.version)
export class GetPacksByTypeCourseController {
  constructor(
    private readonly getPacksByTypeCourseService: GetPacksByTypeCourseService,
  ) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.enum.ADMIN)
  @Get(routesV1.backoffice.typeCourse.packsByTypeCourseId)
  async getTypeCourse(@Param('id') id: string) {
    const packs = await this.getPacksByTypeCourseService.execute(id);

    return { packs: packs };
  }
}
