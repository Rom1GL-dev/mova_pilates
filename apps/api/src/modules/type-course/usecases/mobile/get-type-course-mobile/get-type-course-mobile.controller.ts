import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { routesV1 } from '../../../../../config/app.routes';
import { GetTypeCourseMobileService } from './get-type-course-mobile.service';
import { AuthGuard } from '../../../../../shared/applications/guards/auth.guard';

@Controller(routesV1.version)
@UseGuards(AuthGuard)
export class GetTypeCourseMobileController {
  constructor(
    private readonly getTypeCourseMobileService: GetTypeCourseMobileService,
  ) {}

  @Get(routesV1.mobile.typeCourse.byId)
  async getTypeCourse(@Param('id') id: string) {
    const typeCourse = await this.getTypeCourseMobileService.execute(id);

    return { typeCourse: typeCourse };
  }
}
