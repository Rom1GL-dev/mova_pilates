import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailerService {
  private readonly logger = new Logger(MailerService.name);
  private readonly transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT'),
      secure: true,
      auth: {
        user: this.configService.get('SMTP_USER'),
        pass: this.configService.get('SMTP_PASS'),
      },
    });
  }

  async sendMail({
    to,
    subject,
    text,
    html,
  }: {
    to: string;
    subject: string;
    text?: string;
    html?: string;
  }) {
    try {
      await this.transporter.sendMail({
        from: `"Mova Pilates" <${this.configService.get('SMTP_USER')}>`,
        to,
        subject,
        text,
        html,
      });

      this.logger.log(`📧 Email envoyé à ${to}`);
    } catch (error) {
      this.logger.error(
        `Erreur lors de l’envoi d’un email à ${to}`,
        error.stack,
      );
      throw new Error('Impossible d’envoyer le mail');
    }
  }
}
