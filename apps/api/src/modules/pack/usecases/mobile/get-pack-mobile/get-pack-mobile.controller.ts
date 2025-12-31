import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { routesV1 } from '../../../../../config/app.routes';
import { GetPackMobileService } from './get-pack-mobile.service';
import { AuthGuard } from '../../../../../shared/applications/guards/auth.guard';

@Controller(routesV1.version)
export class GetPackMobileController {
  constructor(private readonly getPackService: GetPackMobileService) {}

  @UseGuards(AuthGuard)
  @Get(routesV1.mobile.packs.byId)
  async getPack(@Param('id') id: string) {
    const pack = await this.getPackService.execute(id);

    return { pack: pack };
  }
}
