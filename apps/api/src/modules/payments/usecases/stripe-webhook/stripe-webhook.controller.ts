import { Controller, Headers, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { routesV1 } from '../../../../config/app.routes';
import { StripeWebhookService } from './stripe-webhook.service';

@Controller(routesV1.version)
export class StripeWebhookController {
  constructor(private readonly stripeWebhookService: StripeWebhookService) {}

  @Post(routesV1.mobile.payments.webhook)
  async handle(
    @Req() req: Request,
    @Headers('stripe-signature') signature: string,
  ) {
    await this.stripeWebhookService.execute(req.body as Buffer, signature);

    return { received: true };
  }
}
