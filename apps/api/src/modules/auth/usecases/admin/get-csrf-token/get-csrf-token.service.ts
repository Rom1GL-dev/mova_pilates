import { Injectable } from '@nestjs/common';
import { CacheStorage } from '../../../../../shared/ports/cache-storage';
import { CsrfMiddleware } from '../../../middlewares/csrf.middleware';

@Injectable()
export class GetCsrfTokenService {
  constructor(private readonly cache: CacheStorage) {}

  async execute(sessionId: string): Promise<string> {
    // Vérifier si un token existe déjà
    let token = await this.cache.get<string>(`csrf:${sessionId}`);

    // Sinon, en générer un nouveau
    if (!token) {
      token = await CsrfMiddleware.generateToken(this.cache, sessionId);
    }

    return token;
  }
}
