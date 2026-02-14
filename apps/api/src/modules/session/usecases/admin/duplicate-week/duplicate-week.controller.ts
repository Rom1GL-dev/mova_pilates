import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { routesV1 } from 'src/config/app.routes';
import { AuthGuard } from 'src/shared/applications/guards/auth.guard';
import { DuplicateWeekDto } from './duplicate-week.dto';
import { AuthenticatedRequest } from '../../../../../types/auth-request';
import { DuplicateWeekService } from './duplicate-week.service';
import { Roles, RolesGuard } from '../../../../auth/config/role.guard';
import { Role } from '@mova_pilates/shared';

@Controller(routesV1.version)
export class DuplicateWeekController {
  constructor(private readonly duplicateWeekService: DuplicateWeekService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.enum.ADMIN)
  @Post(routesV1.backoffice.sessions.duplicateWeek)
  async duplicateWeek(
    @Body() duplicateWeekDto: DuplicateWeekDto,
    @Req() request: AuthenticatedRequest,
  ) {
    const result = await this.duplicateWeekService.execute(
      duplicateWeekDto,
      request.session.user,
    );
    return result;
  }
}
