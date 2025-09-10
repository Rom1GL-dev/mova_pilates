import { Body, Controller, Delete, Req, UseGuards } from '@nestjs/common';
import { routesV1 } from '../../../../config/app.routes';
import { DeleteTypeCourseDto } from './delete-type-course.dto';
import { AuthenticatedRequest } from '../../../../types/auth-request';
import { DeleteTypeCourseService } from './delete-type-course.service';
import { AuthGuard } from '../../../../shared/applications/guards/auth.guard';
import { Roles, RolesGuard } from '../../../auth/config/role.guard';
import { Role } from '@mova_pilates/shared';

@Controller(routesV1.version)
export class DeleteTypeCourseController {
  constructor(
    private readonly deleteTypeCourseService: DeleteTypeCourseService,
  ) {}

  @Delete(routesV1.typeCourse.root)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.enum.ADMIN)
  async delete(
    @Body() deleteTypeDto: DeleteTypeCourseDto,
    @Req() request: AuthenticatedRequest,
  ) {
    const user = await this.deleteTypeCourseService.execute(
      deleteTypeDto,
      request.session.user,
    );

    return { user: user };
  }
}
