import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { routesV1 } from '../../../../../config/app.routes';
import { ListCourseScheduleService } from './list-course-schedule.service';
import { AuthGuard } from '../../../../../shared/applications/guards/auth.guard';

@Controller(routesV1.version)
export class ListCourseScheduleController {
  constructor(
    private readonly listCourseScheduleService: ListCourseScheduleService,
  ) {}

  @Get(routesV1.mobile.typeCourse.schedule)
  @UseGuards(AuthGuard)
  async listTypeCourse(@Param('id') typeCourseId: string) {
    const schedule = await this.listCourseScheduleService.execute(typeCourseId);

    return { schedule: schedule };
  }
}
