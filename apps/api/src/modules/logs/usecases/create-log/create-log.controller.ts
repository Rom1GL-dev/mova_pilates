import { Body, Controller, Post, Req } from '@nestjs/common';
import { routesV1 } from 'src/config/app.routes';
import { AuthenticatedRequest } from '../../../../types/auth-request';
import { CreateLogDto } from './create-log.dto';
import { CreateLogService } from './create-log.service';

@Controller(routesV1.version)
export class CreateLogController {
  constructor(private readonly createLogService: CreateLogService) {}

  @Post(routesV1.backoffice.logs.root)
  async create(
    @Body() createPackDto: CreateLogDto,
    @Req() request: AuthenticatedRequest,
  ) {
    const log = await this.createLogService.execute(
      createPackDto,
      request.session.user.id,
    );
    return { log: log };
  }
}
