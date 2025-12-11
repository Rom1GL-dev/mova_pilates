import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { routesV1 } from '../../../../../config/app.routes';
import { GetTypeCourseService } from './get-type-course.service';
import { Roles, RolesGuard } from '../../../../auth/config/role.guard';
import { Role } from '@mova_pilates/shared';
import { AuthGuard } from '../../../../../shared/applications/guards/auth.guard';

@Controller(routesV1.version)
export class GetTypeCourseController {
  constructor(private readonly getTypeCourseService: GetTypeCourseService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.enum.ADMIN)
  @Get(routesV1.backoffice.typeCourse.byId)
  async getTypeCourse(@Param('id') id: string) {
    const typeCourse = await this.getTypeCourseService.execute(id);

    return { typeCourse: typeCourse };
  }
}
