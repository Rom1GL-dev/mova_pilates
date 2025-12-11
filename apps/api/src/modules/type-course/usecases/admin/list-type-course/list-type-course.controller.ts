import { Controller, Get, UseGuards } from '@nestjs/common';
import { routesV1 } from '../../../../../config/app.routes';
import { ListTypeCourseService } from './list-type-course.service';
import { AuthGuard } from '../../../../../shared/applications/guards/auth.guard';

@Controller(routesV1.version)
export class ListTypeCourseController {
  constructor(private readonly listTypeCourseService: ListTypeCourseService) {}

  @Get(routesV1.backoffice.typeCourse.root)
  @UseGuards(AuthGuard)
  async listTypeCourse() {
    const typeCourse = await this.listTypeCourseService.execute();

    return { typeCourse: typeCourse };
  }
}
