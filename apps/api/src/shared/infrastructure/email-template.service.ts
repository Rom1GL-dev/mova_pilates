import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface EmailTemplate {
  subject: string;
  html: string;
}

@Injectable()
export class EmailTemplateService {
  private wrapInLayout(content: string): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden;">
                  <tr>
                    <td style="background-color: #d4a574; padding: 30px; text-align: center;">
                      <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Mova Pilates</h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 40px 30px;">
                      ${content}
                    </td>
                  </tr>
                  <tr>
                    <td style="background-color: #f8f8f8; padding: 20px 30px; text-align: center; color: #666666; font-size: 12px;">
                      <p style="margin: 0;">Cet email a été envoyé automatiquement par Mova Pilates.</p>
                      <p style="margin: 10px 0 0 0;">© ${new Date().getFullYear()} Mova Pilates. Tous droits réservés.</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;
  }

  welcomeEmail(firstname: string): EmailTemplate {
    const content = `
      <h2 style="color: #1a1a1a; margin: 0 0 20px 0;">Bienvenue ${firstname} !</h2>
      <p style="color: #333333; line-height: 1.6; margin: 0 0 15px 0;">
        Nous sommes ravis de vous accueillir chez Mova Pilates.
      </p>
      <p style="color: #333333; line-height: 1.6; margin: 0 0 15px 0;">
        Votre compte a été créé avec succès. Vous pouvez dès maintenant découvrir nos cours et réserver vos séances.
      </p>
      <p style="color: #333333; line-height: 1.6; margin: 0;">
        À très bientôt sur le tapis !
      </p>
    `;

    return {
      subject: 'Bienvenue chez Mova Pilates !',
      html: this.wrapInLayout(content),
    };
  }

  emailChangedNotificationOld(
    oldEmail: string,
    newEmail: string,
  ): EmailTemplate {
    const content = `
      <h2 style="color: #1a1a1a; margin: 0 0 20px 0;">Changement d'adresse email</h2>
      <p style="color: #333333; line-height: 1.6; margin: 0 0 15px 0;">
        L'adresse email associée à votre compte Mova Pilates a été modifiée.
      </p>
      <table style="background-color: #f8f8f8; border-radius: 4px; padding: 15px; width: 100%; margin: 20px 0;">
        <tr>
          <td style="padding: 10px;">
            <p style="color: #666666; margin: 0 0 5px 0; font-size: 12px;">Ancienne adresse</p>
            <p style="color: #1a1a1a; margin: 0; font-weight: bold;">${oldEmail}</p>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px;">
            <p style="color: #666666; margin: 0 0 5px 0; font-size: 12px;">Nouvelle adresse</p>
            <p style="color: #1a1a1a; margin: 0; font-weight: bold;">${newEmail}</p>
          </td>
        </tr>
      </table>
      <p style="color: #cc0000; line-height: 1.6; margin: 0;">
        Si vous n'êtes pas à l'origine de cette modification, veuillez nous contacter immédiatement.
      </p>
    `;

    return {
      subject: 'Votre adresse email a été modifiée',
      html: this.wrapInLayout(content),
    };
  }

  emailChangedNotificationNew(newEmail: string): EmailTemplate {
    const content = `
      <h2 style="color: #1a1a1a; margin: 0 0 20px 0;">Confirmation de votre nouvelle adresse email</h2>
      <p style="color: #333333; line-height: 1.6; margin: 0 0 15px 0;">
        Votre adresse email a été mise à jour avec succès.
      </p>
      <p style="color: #333333; line-height: 1.6; margin: 0 0 15px 0;">
        Vous recevrez désormais toutes vos communications Mova Pilates à cette adresse :
      </p>
      <p style="color: #1a1a1a; font-weight: bold; margin: 0 0 15px 0; font-size: 18px;">
        ${newEmail}
      </p>
    `;

    return {
      subject: 'Votre nouvelle adresse email est confirmée',
      html: this.wrapInLayout(content),
    };
  }

  reservationConfirmation(
    firstname: string,
    courseType: string,
    sessionDate: Date,
  ): EmailTemplate {
    const formattedDate = format(sessionDate, "EEEE d MMMM yyyy 'à' HH'h'mm", {
      locale: fr,
    });

    const content = `
      <h2 style="color: #1a1a1a; margin: 0 0 20px 0;">Réservation confirmée !</h2>
      <p style="color: #333333; line-height: 1.6; margin: 0 0 15px 0;">
        Bonjour ${firstname},
      </p>
      <p style="color: #333333; line-height: 1.6; margin: 0 0 20px 0;">
        Votre réservation a bien été enregistrée.
      </p>
      <table style="background-color: #f8f8f8; border-radius: 4px; width: 100%; margin: 20px 0;">
        <tr>
          <td style="padding: 20px;">
            <p style="color: #666666; margin: 0 0 5px 0; font-size: 12px;">Cours</p>
            <p style="color: #1a1a1a; margin: 0 0 15px 0; font-weight: bold; font-size: 16px;">${courseType}</p>
            <p style="color: #666666; margin: 0 0 5px 0; font-size: 12px;">Date et heure</p>
            <p style="color: #1a1a1a; margin: 0; font-weight: bold; font-size: 16px;">${formattedDate}</p>
          </td>
        </tr>
      </table>
      <p style="color: #666666; line-height: 1.6; margin: 20px 0 0 0; font-size: 14px;">
        Rappel : les annulations sont possibles jusqu'à 24h avant le début de la séance.
      </p>
    `;

    return {
      subject: `Réservation confirmée - ${courseType}`,
      html: this.wrapInLayout(content),
    };
  }

  reservationCancellation(
    firstname: string,
    courseType: string,
    sessionDate: Date,
  ): EmailTemplate {
    const formattedDate = format(sessionDate, "EEEE d MMMM yyyy 'à' HH'h'mm", {
      locale: fr,
    });

    const content = `
      <h2 style="color: #1a1a1a; margin: 0 0 20px 0;">Réservation annulée</h2>
      <p style="color: #333333; line-height: 1.6; margin: 0 0 15px 0;">
        Bonjour ${firstname},
      </p>
      <p style="color: #333333; line-height: 1.6; margin: 0 0 20px 0;">
        Votre réservation a bien été annulée.
      </p>
      <table style="background-color: #f8f8f8; border-radius: 4px; width: 100%; margin: 20px 0;">
        <tr>
          <td style="padding: 20px;">
            <p style="color: #666666; margin: 0 0 5px 0; font-size: 12px;">Cours annulé</p>
            <p style="color: #1a1a1a; margin: 0 0 15px 0; font-weight: bold; font-size: 16px;">${courseType}</p>
            <p style="color: #666666; margin: 0 0 5px 0; font-size: 12px;">Date et heure</p>
            <p style="color: #1a1a1a; margin: 0; font-weight: bold; font-size: 16px;">${formattedDate}</p>
          </td>
        </tr>
      </table>
      <p style="color: #28a745; line-height: 1.6; margin: 20px 0 0 0; font-weight: bold;">
        ✓ Votre crédit a été remboursé sur votre compte.
      </p>
    `;

    return {
      subject: `Réservation annulée - ${courseType}`,
      html: this.wrapInLayout(content),
    };
  }

  purchaseConfirmation(
    firstname: string,
    packLabel: string,
    amount: number,
    nbCredits: number,
    courseType: string,
  ): EmailTemplate {
    const formattedAmount = (amount / 100).toFixed(2);

    const content = `
      <h2 style="color: #1a1a1a; margin: 0 0 20px 0;">Merci pour votre achat !</h2>
      <p style="color: #333333; line-height: 1.6; margin: 0 0 15px 0;">
        Bonjour ${firstname},
      </p>
      <p style="color: #333333; line-height: 1.6; margin: 0 0 20px 0;">
        Votre paiement a été confirmé. Voici le récapitulatif de votre achat :
      </p>
      <table style="background-color: #f8f8f8; border-radius: 4px; width: 100%; margin: 20px 0;">
        <tr>
          <td style="padding: 20px;">
            <p style="color: #666666; margin: 0 0 5px 0; font-size: 12px;">Pack acheté</p>
            <p style="color: #1a1a1a; margin: 0 0 15px 0; font-weight: bold; font-size: 16px;">${packLabel}</p>
            <p style="color: #666666; margin: 0 0 5px 0; font-size: 12px;">Type de cours</p>
            <p style="color: #1a1a1a; margin: 0 0 15px 0; font-weight: bold; font-size: 16px;">${courseType}</p>
            <p style="color: #666666; margin: 0 0 5px 0; font-size: 12px;">Montant</p>
            <p style="color: #1a1a1a; margin: 0 0 15px 0; font-weight: bold; font-size: 16px;">${formattedAmount} €</p>
            <p style="color: #666666; margin: 0 0 5px 0; font-size: 12px;">Crédits ajoutés</p>
            <p style="color: #28a745; margin: 0; font-weight: bold; font-size: 18px;">+${nbCredits} crédit${nbCredits > 1 ? 's' : ''}</p>
          </td>
        </tr>
      </table>
      <p style="color: #333333; line-height: 1.6; margin: 20px 0 0 0;">
        Vos crédits sont disponibles immédiatement pour réserver vos prochaines séances.
      </p>
    `;

    return {
      subject: `Confirmation d'achat - ${packLabel}`,
      html: this.wrapInLayout(content),
    };
  }

  otpCode(otp: string, expirationMinutes: number = 10): EmailTemplate {
    const content = `
      <h2 style="color: #1a1a1a; margin: 0 0 20px 0;">Votre code de vérification</h2>
      <p style="color: #333333; line-height: 1.6; margin: 0 0 20px 0;">
        Voici votre code pour vous connecter :
      </p>
      <div style="background-color: #f8f8f8; border-radius: 8px; padding: 25px; text-align: center; margin: 20px 0;">
        <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #d4a574;">${otp}</span>
      </div>
      <p style="color: #666666; line-height: 1.6; margin: 20px 0 0 0; font-size: 14px;">
        Ce code expire dans ${expirationMinutes} minutes.
      </p>
      <p style="color: #cc0000; line-height: 1.6; margin: 15px 0 0 0; font-size: 14px;">
        Si vous n'êtes pas à l'origine de cette demande, ignorez cet email.
      </p>
    `;

    return {
      subject: 'Votre code de vérification Mova Pilates',
      html: this.wrapInLayout(content),
    };
  }

  passwordResetOtp(otp: string): EmailTemplate {
    const content = `
      <h2 style="color: #1a1a1a; margin: 0 0 20px 0;">Réinitialisation de mot de passe</h2>
      <p style="color: #333333; line-height: 1.6; margin: 0 0 20px 0;">
        Vous avez demandé à réinitialiser votre mot de passe. Voici votre code de vérification :
      </p>
      <div style="background-color: #f8f8f8; border-radius: 8px; padding: 25px; text-align: center; margin: 20px 0;">
        <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #d4a574;">${otp}</span>
      </div>
      <p style="color: #666666; line-height: 1.6; margin: 20px 0 0 0; font-size: 14px;">
        Ce code expire dans 5 minutes.
      </p>
      <p style="color: #cc0000; line-height: 1.6; margin: 15px 0 0 0; font-size: 14px;">
        Si vous n'avez pas demandé de réinitialisation, ignorez cet email. Votre mot de passe restera inchangé.
      </p>
    `;

    return {
      subject: 'Réinitialisation de votre mot de passe',
      html: this.wrapInLayout(content),
    };
  }

  temporaryPassword(firstname: string, password: string): EmailTemplate {
    const content = `
      <h2 style="color: #1a1a1a; margin: 0 0 20px 0;">Bienvenue ${firstname} !</h2>
      <p style="color: #333333; line-height: 1.6; margin: 0 0 15px 0;">
        Un compte Mova Pilates a été créé pour vous.
      </p>
      <p style="color: #333333; line-height: 1.6; margin: 0 0 20px 0;">
        Voici votre mot de passe temporaire :
      </p>
      <div style="background-color: #f8f8f8; border-radius: 8px; padding: 25px; text-align: center; margin: 20px 0;">
        <span style="font-size: 18px; font-weight: bold; color: #1a1a1a; font-family: monospace;">${password}</span>
      </div>
      <p style="color: #cc0000; line-height: 1.6; margin: 20px 0 0 0; font-size: 14px; font-weight: bold;">
        Nous vous recommandons de changer ce mot de passe dès votre première connexion.
      </p>
    `;

    return {
      subject: 'Votre compte Mova Pilates a été créé',
      html: this.wrapInLayout(content),
    };
  }

  accountDeleted(firstname: string): EmailTemplate {
    const content = `
      <h2 style="color: #1a1a1a; margin: 0 0 20px 0;">Compte supprimé</h2>
      <p style="color: #333333; line-height: 1.6; margin: 0 0 15px 0;">
        Bonjour ${firstname},
      </p>
      <p style="color: #333333; line-height: 1.6; margin: 0 0 15px 0;">
        Conformément à votre demande, votre compte Mova Pilates a été supprimé.
      </p>
      <p style="color: #333333; line-height: 1.6; margin: 0 0 20px 0;">
        Vos données personnelles ont été anonymisées conformément au RGPD.
      </p>
      <table style="background-color: #f8f8f8; border-radius: 4px; width: 100%; margin: 20px 0;">
        <tr>
          <td style="padding: 20px;">
            <p style="color: #666666; margin: 0 0 10px 0; font-size: 14px;">
              <strong>Ce qui a été supprimé :</strong>
            </p>
            <ul style="color: #666666; margin: 0; padding-left: 20px; font-size: 14px;">
              <li>Vos informations personnelles (nom, email, téléphone)</li>
              <li>Vos réservations futures ont été annulées</li>
              <li>Vos crédits restants</li>
            </ul>
            <p style="color: #666666; margin: 15px 0 0 0; font-size: 14px;">
              <strong>Ce qui est conservé (obligation légale) :</strong>
            </p>
            <ul style="color: #666666; margin: 0; padding-left: 20px; font-size: 14px;">
              <li>Historique des paiements (10 ans)</li>
            </ul>
          </td>
        </tr>
      </table>
      <p style="color: #333333; line-height: 1.6; margin: 20px 0 0 0;">
        Nous espérons vous revoir bientôt chez Mova Pilates.
      </p>
    `;

    return {
      subject: 'Votre compte Mova Pilates a été supprimé',
      html: this.wrapInLayout(content),
    };
  }
}
