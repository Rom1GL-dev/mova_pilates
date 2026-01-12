import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { DeleteAccountDto } from './delete-account.dto';
import { Session } from '../../../../../types/session';
import { PrismaService } from '../../../../../shared/infrastructure/prisma.service';
import { MailerService } from '../../../../../shared/infrastructure/mailer.service';
import { EmailTemplateService } from '../../../../../shared/infrastructure/email-template.service';
import { CacheStorage } from '../../../../../shared/ports/cache-storage';
import { hashPassword } from '../../../../../shared/utils/hashPassword';
import { comparePasswords } from '../../../../auth/config/sessions';
import { getSessionStorageKey } from '../../../../auth/config/storage';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DeleteAccountService {
  private readonly logger = new Logger(DeleteAccountService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly mailer: MailerService,
    private readonly emailTemplate: EmailTemplateService,
    private readonly cache: CacheStorage,
  ) {}

  async execute(
    dto: DeleteAccountDto,
    sessionUser: Session['user'],
    sessionId: string,
  ) {
    if (!sessionUser) {
      throw new UnauthorizedException(
        'Demande non autorisée. Veuillez vous connecter.',
      );
    }

    const user = await this.prisma.user.findUnique({
      where: { id: sessionUser.id },
    });

    if (!user) {
      throw new UnauthorizedException('Utilisateur introuvable.');
    }

    if (user.deletedAt) {
      throw new BadRequestException('Ce compte a déjà été supprimé.');
    }

    // Vérifier le mot de passe
    const passwordMatch = await comparePasswords(dto.password, user.password);
    if (!passwordMatch) {
      throw new BadRequestException('Mot de passe incorrect.');
    }

    // Sauvegarder les infos pour l'email avant anonymisation
    const originalEmail = user.email;
    const originalFirstname = user.firstname;

    await this.prisma.$transaction(async (tx) => {
      // 1. Récupérer les réservations futures confirmées
      const futureReservations = await tx.reservation.findMany({
        where: {
          userId: user.id,
          status: 'CONFIRMED',
          session: {
            startDate: { gt: new Date() },
          },
        },
        include: {
          session: true,
        },
      });

      // 2. Annuler les réservations futures et rembourser les crédits
      for (const reservation of futureReservations) {
        await tx.reservation.update({
          where: { id: reservation.id },
          data: { status: 'CANCELLED' },
        });

        // Rembourser le crédit
        await tx.wallet.updateMany({
          where: {
            userId: user.id,
            typeCourseId: reservation.session.typeCourseId,
          },
          data: {
            balance: { increment: 1 },
          },
        });
      }

      // 3. Anonymiser l'utilisateur
      const anonymizedPassword = await hashPassword(uuidv4());
      await tx.user.update({
        where: { id: user.id },
        data: {
          email: `deleted-${user.id}@anonymized.local`,
          firstname: 'Utilisateur',
          lastname: 'Supprimé',
          password: anonymizedPassword,
          tel: null,
          dob: null,
          deletedAt: new Date(),
        },
      });

      // 4. Log de suppression
      await tx.log.create({
        data: {
          userId: user.id,
          appType: 'MOBILE',
          logType: 'DELETE',
          message: `Suppression du compte par l'utilisateur : ${originalFirstname} (${originalEmail})`,
        },
      });
    });

    // 5. Invalider la session actuelle
    await this.cache.del(getSessionStorageKey(sessionId));

    // 6. Envoyer email de confirmation (hors transaction)
    const deleteEmail = this.emailTemplate.accountDeleted(originalFirstname);
    this.mailer
      .sendMail({
        to: originalEmail,
        subject: deleteEmail.subject,
        html: deleteEmail.html,
      })
      .catch((error) => {
        this.logger.error(
          `Erreur envoi email suppression à ${originalEmail}`,
          error,
        );
      });

    return {
      message: 'Votre compte a été supprimé. Vous allez être déconnecté.',
    };
  }
}
