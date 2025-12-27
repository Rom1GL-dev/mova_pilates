import { Module } from '@nestjs/common';

import { SharedModule } from '../../shared/shared.module';

import { LogModule } from '../logs/log.module';
import { CreatePaymentIntentService } from './usecases/create-payment-intent/create-payment-intent.service';
import { StripeWebhookService } from './usecases/stripe-webhook/stripe-webhook.service';
import { CreatePaymentIntentController } from './usecases/create-payment-intent/create-payment-intent.controller';
import { StripeWebhookController } from './usecases/stripe-webhook/stripe-webhook.controller';

@Module({
  imports: [SharedModule, LogModule],
  providers: [CreatePaymentIntentService, StripeWebhookService],
  controllers: [CreatePaymentIntentController, StripeWebhookController],
  exports: [],
})
export class PaymentsModule {}
