import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export enum AlertSeverity {
  CRITICAL = 'CRITICAL', // 🔴 Rouge - Erreurs critiques
  ERROR = 'ERROR', // 🟠 Orange - Erreurs importantes
  WARNING = 'WARNING', // 🟡 Jaune - Avertissements
  INFO = 'INFO', // 🔵 Bleu - Informations
}

interface DiscordAlert {
  severity: AlertSeverity;
  title: string;
  description: string;
  error?: Error;
  context?: Record<string, any>;
}

@Injectable()
export class DiscordAlertService {
  private readonly logger = new Logger(DiscordAlertService.name);
  private readonly webhookUrl: string;
  private readonly isProduction: boolean;

  constructor(private readonly configService: ConfigService) {
    this.webhookUrl =
      this.configService.get<string>('DISCORD_ALERT_WEBHOOK_URL') || '';
    this.isProduction =
      this.configService.get<string>('NODE_ENV') === 'production';
  }

  async sendAlert(alert: DiscordAlert): Promise<void> {
    // Ne pas envoyer d'alertes en développement (sauf si explicitement activé)
    if (
      !this.isProduction &&
      !this.configService.get<boolean>('ENABLE_DEV_ALERTS')
    ) {
      this.logger.debug(`[DEV] Alert supprimée: ${alert.title}`);
      return;
    }

    if (!this.webhookUrl) {
      this.logger.warn('Discord webhook URL not configured for alerts');
      return;
    }

    try {
      const fields: any[] = [];

      // Ajouter le contexte
      if (alert.context) {
        Object.entries(alert.context).forEach(([key, value]) => {
          fields.push({
            name: key,
            value:
              typeof value === 'object'
                ? JSON.stringify(value, null, 2)
                : String(value),
            inline: true,
          });
        });
      }

      // Ajouter l'erreur
      if (alert.error) {
        fields.push({
          name: 'Erreur',
          value: `\`\`\`${alert.error.message}\`\`\``,
          inline: false,
        });

        if (alert.error.stack) {
          // Limiter la stack trace à 1000 caractères
          const stack = alert.error.stack.substring(0, 1000);
          fields.push({
            name: 'Stack Trace',
            value: `\`\`\`${stack}\`\`\``,
            inline: false,
          });
        }
      }

      // Ajouter timestamp et environnement
      fields.push({
        name: 'Environnement',
        value: this.isProduction ? 'Production 🚀' : 'Développement 🛠️',
        inline: true,
      });

      const embed = {
        title: `${this.getEmojiForSeverity(alert.severity)} ${alert.title}`,
        description: alert.description,
        color: this.getColorForSeverity(alert.severity),
        fields,
        timestamp: new Date().toISOString(),
        footer: {
          text: 'MOVA Pilates - Monitoring',
        },
      };

      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          embeds: [embed],
        }),
      });

      if (!response.ok) {
        this.logger.error(
          `Failed to send Discord alert: ${response.statusText}`,
        );
      }
    } catch (error) {
      this.logger.error('Error sending Discord alert', error);
    }
  }

  // Méthodes de raccourci
  async critical(
    title: string,
    description: string,
    error?: Error,
    context?: Record<string, any>,
  ) {
    await this.sendAlert({
      severity: AlertSeverity.CRITICAL,
      title,
      description,
      error,
      context,
    });
  }

  async error(
    title: string,
    description: string,
    error?: Error,
    context?: Record<string, any>,
  ) {
    await this.sendAlert({
      severity: AlertSeverity.ERROR,
      title,
      description,
      error,
      context,
    });
  }

  async warning(
    title: string,
    description: string,
    context?: Record<string, any>,
  ) {
    await this.sendAlert({
      severity: AlertSeverity.WARNING,
      title,
      description,
      context,
    });
  }

  async info(
    title: string,
    description: string,
    context?: Record<string, any>,
  ) {
    await this.sendAlert({
      severity: AlertSeverity.INFO,
      title,
      description,
      context,
    });
  }

  private getColorForSeverity(severity: AlertSeverity): number {
    switch (severity) {
      case AlertSeverity.CRITICAL:
        return 15548997; // Rouge
      case AlertSeverity.ERROR:
        return 16744192; // Orange
      case AlertSeverity.WARNING:
        return 16776960; // Jaune
      case AlertSeverity.INFO:
        return 3447003; // Bleu
      default:
        return 8421504; // Gris
    }
  }

  private getEmojiForSeverity(severity: AlertSeverity): string {
    switch (severity) {
      case AlertSeverity.CRITICAL:
        return '🔴';
      case AlertSeverity.ERROR:
        return '🟠';
      case AlertSeverity.WARNING:
        return '🟡';
      case AlertSeverity.INFO:
        return '🔵';
      default:
        return '⚪';
    }
  }
}
