import { Controller, Get } from '@nestjs/common';
import { routesV1 } from '../../../../../config/app.routes';
import { ListTypeCourseWithPacksService } from './list-type-course-with-packs.service';

@Controller(routesV1.version)
export class ListTypeCourseWithPacksController {
  constructor(
    private readonly listTypeCourseWithPacksMobileService: ListTypeCourseWithPacksService,
  ) {}

  @Get(routesV1.mobile.typeCourse.withPacks)
  // @UseGuards(AuthGuard)
  async listTypeWithPacksCourse() {
    const typeCourse =
      await this.listTypeCourseWithPacksMobileService.execute();

    return { typeCourse: typeCourse };
  }
}
