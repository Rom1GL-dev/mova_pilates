import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { DiscordAlertService } from '../services/discord-alert.service';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  constructor(private readonly discordAlertService: DiscordAlertService) {}

  async catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : exception instanceof Error
          ? exception.message
          : 'Internal server error';

    // Log l'erreur
    this.logger.error(
      `${request.method} ${request.url}`,
      exception instanceof Error ? exception.stack : exception,
    );

    // Envoyer une alerte Discord pour les erreurs critiques
    if (this.shouldSendAlert(status, exception)) {
      await this.sendDiscordAlert(exception, request, status);
    }

    // Réponse HTTP
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: typeof message === 'string' ? message : (message as any).message || 'Error',
    });
  }

  private shouldSendAlert(status: number, exception: unknown): boolean {
    // Envoyer une alerte pour :
    // - Erreurs 500 (serveur)
    // - Erreurs de base de données (Prisma)
    // - Erreurs de paiement
    // - Erreurs critiques spécifiques

    if (status >= 500) {
      return true; // Toutes les erreurs serveur
    }

    if (exception instanceof Error) {
      const errorMessage = exception.message.toLowerCase();
      const errorName = exception.constructor.name;

      // Erreurs Prisma
      if (errorName.includes('Prisma')) {
        return true;
      }

      // Erreurs Stripe
      if (errorMessage.includes('stripe') || errorName.includes('Stripe')) {
        return true;
      }

      // Erreurs email
      if (errorMessage.includes('email') || errorMessage.includes('mailer')) {
        return true;
      }

      // Erreurs Redis/Session
      if (errorMessage.includes('redis') || errorMessage.includes('session')) {
        return true;
      }
    }

    return false;
  }

  private async sendDiscordAlert(
    exception: unknown,
    request: Request,
    status: number,
  ): Promise<void> {
    const error = exception instanceof Error ? exception : new Error(String(exception));

    const context = {
      'Méthode': request.method,
      'URL': request.url,
      'Status': status.toString(),
      'User-Agent': request.get('user-agent') || 'N/A',
      'IP': request.ip || 'N/A',
    };

    // Ajouter l'utilisateur si disponible
    if ((request as any).session?.user) {
      context['Utilisateur'] = (request as any).session.user.email;
    }

    await this.discordAlertService.critical(
      `Erreur ${status} - ${request.method} ${request.url}`,
      `Une erreur critique s'est produite sur l'application.`,
      error,
      context,
    );
  }
}
