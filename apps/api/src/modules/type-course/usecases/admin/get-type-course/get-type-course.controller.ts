import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { routesV1 } from '../../../../../config/app.routes';
import { GetTypeCourseService } from './get-type-course.service';
import { Roles, RolesGuard } from '../../../../auth/config/role.guard';
import { Role } from '@mova_pilates/shared';

@Controller(routesV1.version)
@UseGuards(RolesGuard)
export class GetTypeCourseController {
  constructor(private readonly getTypeCourseService: GetTypeCourseService) {}

  @Get(routesV1.backoffice.typeCourse.byId)
  @Roles(Role.enum.ADMIN)
  async getTypeCourse(@Param('id') id: string) {
    const typeCourse = await this.getTypeCourseService.execute(id);

    return { typeCourse: typeCourse };
  }
}
