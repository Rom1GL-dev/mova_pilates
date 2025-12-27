import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { StripeService } from '../../../../shared/infrastructure/stripe.service';

@Injectable()
export class StripeWebhookService {
  constructor(private readonly stripeService: StripeService) {}

  async execute(payload: Buffer, signature: string) {
    const event = this.stripeService.constructWebhookEvent(payload, signature);

    switch (event.type) {
      case 'payment_intent.succeeded': {
        const intent = event.data.object as Stripe.PaymentIntent;

        console.log('je suis entrain de payer :', intent);
        // 🔜 ICI :
        // - retrouver l’utilisateur
        // - créditer le wallet
        // - logger le paiement

        break;
      }

      case 'payment_intent.payment_failed':
        // log erreur
        break;
    }
  }
}
