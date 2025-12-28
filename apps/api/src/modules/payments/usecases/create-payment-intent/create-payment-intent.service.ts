import { Injectable, UnauthorizedException } from '@nestjs/common';
import { StripeService } from '../../../../shared/infrastructure/stripe.service';
import { CreatePaymentIntentDto } from './create-payment-intent.dto';
import { PrismaService } from '../../../../shared/infrastructure/prisma.service';
import { Session } from '../../../../types/session';

@Injectable()
export class CreatePaymentIntentService {
  constructor(
    private readonly stripeService: StripeService,
    private readonly prisma: PrismaService,
  ) {}

  async execute(body: CreatePaymentIntentDto, user: Session['user']) {
    if (!user) {
      throw new UnauthorizedException(
        'Demande non autorisée. Veuillez vous connecter.',
      );
    }

    const pack = await this.prisma.pack.findUnique({
      where: { id: body.packId },
    });

    if (!pack) {
      throw new Error('Pack not found');
    }

    const intent = await this.stripeService.createPaymentIntent({
      amount: Math.round(pack.price * 100),
      currency: 'eur',
      automatic_payment_methods: { enabled: true },

      metadata: {
        userId: user.id,
        packId: body.packId,
      },
    });

    return {
      clientSecret: intent.client_secret,
    };
  }
}
