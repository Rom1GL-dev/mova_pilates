import { Controller, Get, Param } from '@nestjs/common';
import { routesV1 } from '../../../../../config/app.routes';
import { ListSessionByTypeCourseService } from './list-session-by-type-course.service';

@Controller(routesV1.version)
export class ListSessionByTypeCourseController {
  constructor(
    private readonly listSessionByTypeCourseService: ListSessionByTypeCourseService,
  ) {}

  // @UseGuards(AuthGuard, RolesGuard)
  // @Roles(Role.enum.USER)
  @Get(routesV1.mobile.sessions.byTypeCourse)
  async list(@Param('typeCourseId') typeCourseId: string) {
    return this.listSessionByTypeCourseService.execute(typeCourseId);
  }
}
