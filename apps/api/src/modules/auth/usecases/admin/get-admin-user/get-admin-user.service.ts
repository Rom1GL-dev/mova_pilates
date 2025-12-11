import { Injectable } from '@nestjs/common';
import { Session } from '../../../../../types/session';
import { getSessionStorageKey } from '../../../config/storage';
import { CacheStorage } from '../../../../../shared/ports/cache-storage';

@Injectable()
export class GetAdminUserService {
  constructor(private readonly cache: CacheStorage) {}

  async getAdminUser(sessionId: string): Promise<Session['user'] | null> {
    const user = await this.cache.get<Session['user']>(
      getSessionStorageKey(sessionId),
    );
    if (!user) {
      return null;
    }
    return user;
  }
}
