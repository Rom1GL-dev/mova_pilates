import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { routesV1 } from 'src/config/app.routes';
import { AuthGuard } from 'src/shared/applications/guards/auth.guard';
import { CreateTypeCourseDto } from './create-type-course.dto';
import { AuthenticatedRequest } from '../../../../../types/auth-request';
import { CreateTypeCourseService } from './create-type-course.service';
import { Roles, RolesGuard } from '../../../../auth/config/role.guard';
import { Role } from '@mova_pilates/shared';

@Controller(routesV1.version)
export class CreateTypeCourseController {
  constructor(
    private readonly createTypeCourseService: CreateTypeCourseService,
  ) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.enum.ADMIN)
  @Post(routesV1.backoffice.typeCourse.root)
  async create(
    @Body() createTypeCourseDto: CreateTypeCourseDto,
    @Req() request: AuthenticatedRequest,
  ) {
    const users = await this.createTypeCourseService.execute(
      createTypeCourseDto,
      request.session.user,
    );
    return { users: users };
  }
}
