import { Controller, Get, UseGuards } from '@nestjs/common';
import { routesV1 } from '../../../../../config/app.routes';
import { ListTypeCourseService } from './list-type-course.service';
import { AuthGuard } from '../../../../../shared/applications/guards/auth.guard';
import { Roles, RolesGuard } from '../../../../auth/config/role.guard';
import { Role } from '@mova_pilates/shared';

@Controller(routesV1.version)
export class ListTypeCourseController {
  constructor(private readonly listTypeCourseService: ListTypeCourseService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.enum.ADMIN)
  @Get(routesV1.backoffice.typeCourse.root)
  async listTypeCourse() {
    const typeCourse = await this.listTypeCourseService.execute();

    return { typeCourse: typeCourse };
  }
}
