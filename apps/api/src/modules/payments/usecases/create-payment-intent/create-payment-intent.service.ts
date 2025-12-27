import { Injectable } from '@nestjs/common';
import { StripeService } from '../../../../shared/infrastructure/stripe.service';
import { CreatePaymentIntentDto } from './create-payment-intent.dto';
import { PrismaService } from '../../../../shared/infrastructure/prisma.service';

@Injectable()
export class CreatePaymentIntentService {
  constructor(
    private readonly stripeService: StripeService,
    private readonly prisma: PrismaService,
  ) {}

  async execute(body: CreatePaymentIntentDto) {
    const pack = await this.prisma.pack.findUnique({
      where: { id: body.packId },
    });

    if (!pack) {
      throw new Error('Pack not found');
    }

    const intent = await this.stripeService.createPaymentIntent({
      amount: pack.price * 100,
      currency: 'eur',
    });

    return {
      clientSecret: intent.client_secret,
    };
  }
}
