import {
  Injectable,
  NestMiddleware,
  ForbiddenException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { randomBytes } from 'crypto';
import { CacheStorage } from '../../../shared/ports/cache-storage';

@Injectable()
export class CsrfMiddleware implements NestMiddleware {
  // Routes exemptées du CSRF (login, register, webhooks, etc.)
  private readonly exemptedPaths = [
    '/v1/backoffice/auth/admin/login',
    '/v1/backoffice/auth/verify-otp',
    '/v1/backoffice/auth/register',
    '/v1/payments/webhook',
  ];

  constructor(private readonly cache: CacheStorage) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // Exempter les requêtes avec header x-session-id (app mobile)
    const mobileSessionHeader = req.headers['x-session-id'];
    if (mobileSessionHeader) {
      return next();
    }

    // Exempter les requêtes GET/HEAD/OPTIONS (lecture seule)
    if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
      return next();
    }

    // Exempter les routes spécifiques (login, webhooks, etc.)
    if (this.exemptedPaths.some((path) => req.path === path)) {
      return next();
    }

    // Vérifier uniquement les routes backoffice (admin dashboard)
    if (!req.path.includes('/backoffice/')) {
      return next();
    }

    const sessionId =
      req.cookies?.sessionId_admin || req.cookies?.sessionId;

    if (!sessionId) {
      throw new ForbiddenException('No session found');
    }

    // Récupérer le token CSRF du header ou body
    const csrfToken =
      req.headers['x-csrf-token'] ||
      req.body?._csrf ||
      req.query?._csrf;

    if (!csrfToken) {
      throw new ForbiddenException('CSRF token missing');
    }

    // Vérifier le token dans Redis
    const storedToken = await this.cache.get<string>(
      `csrf:${sessionId}`,
    );

    if (!storedToken || storedToken !== csrfToken) {
      throw new ForbiddenException('Invalid CSRF token');
    }

    next();
  }

  /**
   * Génère un nouveau token CSRF pour une session
   */
  static async generateToken(
    cache: CacheStorage,
    sessionId: string,
  ): Promise<string> {
    const token = randomBytes(32).toString('hex');
    // TTL de 24h pour le token CSRF
    await cache.set(`csrf:${sessionId}`, token, 24 * 60 * 60 * 1000);
    return token;
  }
}
