import { Injectable, Logger } from '@nestjs/common';
import { StripeService } from '../../../../shared/infrastructure/stripe.service';
import { PrismaService } from '../../../../shared/infrastructure/prisma.service';
import { MailerService } from '../../../../shared/infrastructure/mailer.service';
import { EmailTemplateService } from '../../../../shared/infrastructure/email-template.service';

@Injectable()
export class StripeWebhookService {
  private readonly logger = new Logger(StripeWebhookService.name);

  constructor(
    private readonly stripeService: StripeService,
    private readonly prisma: PrismaService,
    private readonly mailer: MailerService,
    private readonly emailTemplate: EmailTemplateService,
  ) {}

  async execute(payload: Buffer, signature: string) {
    const event = this.stripeService.constructWebhookEvent(payload, signature);

    if (event.type !== 'payment_intent.succeeded') return;

    const intent = event.data.object;

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
      include: { typeCourse: true },
    });

    if (!pack) {
      this.logger.error(`Pack not found: ${packId}`);
      throw new Error('Pack not found');
    }

    // Vérifier que le pack n'est pas archivé
    if (pack.archivedAt) {
      this.logger.error(`Pack is archived: ${packId}`);
      throw new Error('Pack is archived');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      this.logger.error(`User not found: ${userId}`);
      throw new Error('User not found');
    }

    // Vérifier que le montant payé correspond au prix du pack
    const expectedAmount = Math.round(pack.price * 100); // Stripe utilise les centimes
    if (intent.amount_received !== expectedAmount) {
      this.logger.error(
        `Payment amount mismatch for pack ${packId}. Expected: ${expectedAmount}, Received: ${intent.amount_received}`,
      );
      throw new Error('Payment amount does not match pack price');
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
        message: `Achat du pack ${pack.label} à ${(intent.amount_received / 100).toFixed(2)}€ réussi.`,
      },
    });

    // Email de confirmation d'achat (non bloquant)
    const purchaseEmail = this.emailTemplate.purchaseConfirmation(
      user.firstname,
      pack.label,
      intent.amount_received,
      pack.nbCourse,
      pack.typeCourse.label,
    );
    this.mailer
      .sendMail({
        to: user.email,
        subject: purchaseEmail.subject,
        html: purchaseEmail.html,
      })
      .catch((error) => {
        this.logger.error(
          `Erreur envoi confirmation achat à ${user.email}`,
          error,
        );
      });
  }
}
