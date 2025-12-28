import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { StripeService } from '../../../../shared/infrastructure/stripe.service';
import { PrismaService } from '../../../../shared/infrastructure/prisma.service';

@Injectable()
export class StripeWebhookService {
  constructor(
    private readonly stripeService: StripeService,
    private readonly prisma: PrismaService,
  ) {}

  async execute(payload: Buffer, signature: string) {
    const event = this.stripeService.constructWebhookEvent(payload, signature);

    if (event.type !== 'payment_intent.succeeded') return;

    const intent = event.data.object as Stripe.PaymentIntent;

    const userId = intent.metadata.userId;
    const packId = intent.metadata.packId;

    if (!userId || !packId) {
      throw new Error('Missing metadata');
    }

    const existingOrder = await this.prisma.order.findUnique({
      where: { stripeIntentId: intent.id },
    });

    if (existingOrder) return;

    const pack = await this.prisma.pack.findUnique({
      where: { id: packId },
    });

    if (!pack) {
      throw new Error('Pack not found');
    }

    await this.prisma.order.create({
      data: {
        userId,
        packId,
        stripeIntentId: intent.id,
        amount: intent.amount_received,
        status: 'SUCCESS',
      },
    });

    await this.prisma.wallet.upsert({
      where: {
        userId_typeCourseId: {
          userId,
          typeCourseId: pack.typeCourseId,
        },
      },
      update: {
        balance: { increment: pack.nbCourse },
      },
      create: {
        userId,
        typeCourseId: pack.typeCourseId,
        balance: pack.nbCourse,
      },
    });

    await this.prisma.log.create({
      data: {
        userId,
        appType: 'MOBILE',
        logType: 'PAYMENT',
        message: `Achat du pack ${pack.label}`,
      },
    });
  }
}
