import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { routesV1 } from '../../../../config/app.routes';
import { AuthGuard } from '../../../../shared/applications/guards/auth.guard';
import { CreatePaymentIntentService } from './create-payment-intent.service';
import { CreatePaymentIntentDto } from './create-payment-intent.dto';

@Controller(routesV1.version)
export class CreatePaymentIntentController {
  constructor(
    private readonly createPaymentIntentService: CreatePaymentIntentService,
  ) {}

  @UseGuards(AuthGuard)
  @Post(routesV1.mobile.payments.intent)
  async createIntent(@Body() body: CreatePaymentIntentDto) {
    return this.createPaymentIntentService.execute(body);
  }
}
