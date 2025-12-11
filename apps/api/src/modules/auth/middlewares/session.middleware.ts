import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { getSessionStorageKey, SESSION_TTL_MS } from '../config/storage';
import { ConfigService } from '@nestjs/config';
import { getCookiesOptions } from '../../../shared/utils/cookies';
import { CacheStorage } from '../../../shared/ports/cache-storage';
import { Session } from '../../../types/session';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  constructor(
    private readonly cache: CacheStorage,
    private readonly configService: ConfigService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const headerSessionId = req.headers['x-session-id'] as string | undefined;
    const cookieSessionId = req.cookies['sessionId_admin'] as
      | string
      | undefined;

    const sessionId = headerSessionId || cookieSessionId;

    if (!sessionId) {
      req.session = undefined as any;
      return next();
    }

    const user: Session['user'] | undefined = await this.cache.get(
      getSessionStorageKey(sessionId),
    );

    if (!user) {
      req.session = undefined as any;
      return next();
    }

    req.session = { id: sessionId, user };

    res.on('finish', async () => {
      await this.cache.set(
        getSessionStorageKey(sessionId),
        user,
        SESSION_TTL_MS,
      );
    });

    if (cookieSessionId) {
      const label = 'sessionId_admin';

      res.cookie(label, sessionId, getCookiesOptions(this.configService));
    }

    next();
  }
}
