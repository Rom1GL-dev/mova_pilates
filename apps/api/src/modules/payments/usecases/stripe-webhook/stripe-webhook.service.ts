import { Injectable, Logger } from '@nestjs/common';
import { StripeService } from '../../../../shared/infrastructure/stripe.service';
import { PrismaService } from '../../../../shared/infrastructure/prisma.service';
import { MailerService } from '../../../../shared/infrastructure/mailer.service';
import { EmailTemplateService } from '../../../../shared/infrastructure/email-template.service';
import { DiscordAlertService } from '../../../../shared/services/discord-alert.service';

@Injectable()
export class StripeWebhookService {
  private readonly logger = new Logger(StripeWebhookService.name);

  constructor(
    private readonly stripeService: StripeService,
    private readonly prisma: PrismaService,
    private readonly mailer: MailerService,
    private readonly emailTemplate: EmailTemplateService,
    private readonly discordAlertService: DiscordAlertService,
  ) {}

  async execute(payload: Buffer, signature: string) {
    const event = this.stripeService.constructWebhookEvent(payload, signature);

    // Gérer les paiements échoués
    if (event.type === 'payment_intent.payment_failed') {
      const intent = event.data.object;
      await this.discordAlertService.error(
        '💳 Paiement échoué',
        `Un paiement Stripe a échoué`,
        undefined,
        {
          'Intent ID': intent.id,
          'Montant': `${(intent.amount / 100).toFixed(2)}€`,
          'Raison': intent.last_payment_error?.message || 'Inconnue',
          'User ID': intent.metadata.userId || 'N/A',
          'Pack ID': intent.metadata.packId || 'N/A',
        },
      );
      return;
    }

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
      await this.discordAlertService.critical(
        '🚨 Pack introuvable lors du paiement',
        `Un paiement a été reçu pour un pack qui n'existe pas`,
        undefined,
        {
          'Pack ID': packId,
          'User ID': userId,
          'Intent ID': intent.id,
          'Montant': `${(intent.amount_received / 100).toFixed(2)}€`,
        },
      );
      throw new Error('Pack not found');
    }

    // Vérifier que le pack n'est pas archivé
    if (pack.archivedAt) {
      this.logger.error(`Pack is archived: ${packId}`);
      await this.discordAlertService.warning(
        '⚠️ Paiement pour pack archivé',
        `Un paiement a été reçu pour un pack archivé`,
        undefined,
        {
          'Pack': pack.label,
          'Pack ID': packId,
          'User ID': userId,
          'Montant': `${(intent.amount_received / 100).toFixed(2)}€`,
        },
      );
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
      await this.discordAlertService.critical(
        '🚨 Montant de paiement incorrect',
        `Le montant payé ne correspond pas au prix du pack`,
        undefined,
        {
          'Pack': pack.label,
          'Montant attendu': `${(expectedAmount / 100).toFixed(2)}€`,
          'Montant reçu': `${(intent.amount_received / 100).toFixed(2)}€`,
          'Différence': `${((intent.amount_received - expectedAmount) / 100).toFixed(2)}€`,
          'User ID': userId,
          'Intent ID': intent.id,
        },
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
