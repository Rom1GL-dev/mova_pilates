import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { routesV1 } from '../../../../config/app.routes';
import { AuthGuard } from '../../../../shared/applications/guards/auth.guard';
import { CreatePaymentIntentService } from './create-payment-intent.service';
import { CreatePaymentIntentDto } from './create-payment-intent.dto';
import { AuthenticatedRequest } from '../../../../types/auth-request';

@Controller(routesV1.version)
export class CreatePaymentIntentController {
  constructor(
    private readonly createPaymentIntentService: CreatePaymentIntentService,
  ) {}

  @UseGuards(AuthGuard)
  @Post(routesV1.mobile.payments.intent)
  async createIntent(
    @Req() req: AuthenticatedRequest,
    @Body() body: CreatePaymentIntentDto,
  ) {
    return this.createPaymentIntentService.execute(body, req.session.user);
  }
}
