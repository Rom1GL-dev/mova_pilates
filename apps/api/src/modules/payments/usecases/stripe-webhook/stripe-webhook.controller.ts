import { Controller, Headers, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { routesV1 } from '../../../../config/app.routes';
import { StripeWebhookService } from './stripe-webhook.service';
import { AuthGuard } from '../../../../shared/applications/guards/auth.guard';

@Controller(routesV1.version)
export class StripeWebhookController {
  constructor(private readonly stripeWebhookService: StripeWebhookService) {}

  @Post(routesV1.mobile.payments.webhook)
  @UseGuards(AuthGuard)
  async handle(
    @Req() req: Request,
    @Headers('stripe-signature') signature: string,
  ) {
    await this.stripeWebhookService.execute(req.body as Buffer, signature);

    return { received: true };
  }
}
