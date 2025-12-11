import { Body, Controller, Put, Req, UseGuards } from '@nestjs/common';
import { routesV1 } from '../../../../../config/app.routes';
import { AuthGuard } from '../../../../../shared/applications/guards/auth.guard';
import { UpdateTypeCourseDto } from './update-type-course.dto';
import { AuthenticatedRequest } from '../../../../../types/auth-request';
import { UpdateTypeCourseService } from './update-type-course.service';
import { Roles, RolesGuard } from '../../../../auth/config/role.guard';
import { Role } from '@mova_pilates/shared';

@Controller(routesV1.version)
export class UpdateTypeCourseController {
  constructor(
    private readonly updateTypeCourseService: UpdateTypeCourseService,
  ) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.enum.ADMIN)
  @Put(routesV1.backoffice.typeCourse.root)
  async execute(
    @Body() updateTypeCourseDto: UpdateTypeCourseDto,
    @Req() request: AuthenticatedRequest,
  ) {
    const typeCourse = await this.updateTypeCourseService.execute(
      updateTypeCourseDto,
      request.session.user,
    );

    return { typeCourse: typeCourse };
  }
}
