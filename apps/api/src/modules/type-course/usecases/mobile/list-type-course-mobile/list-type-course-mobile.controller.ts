import { Controller, Get, UseGuards } from '@nestjs/common';
import { routesV1 } from '../../../../../config/app.routes';
import { ListTypeCourseMobileService } from './list-type-course-mobile.service';
import { AuthGuard } from '../../../../../shared/applications/guards/auth.guard';

@Controller(routesV1.version)
export class ListTypeCourseMobileController {
  constructor(
    private readonly listTypeCourseMobileService: ListTypeCourseMobileService,
  ) {}

  @Get(routesV1.mobile.typeCourse.root)
  @UseGuards(AuthGuard)
  async listTypeCourse() {
    const typeCourse = await this.listTypeCourseMobileService.execute();

    return { typeCourse: typeCourse };
  }
}
