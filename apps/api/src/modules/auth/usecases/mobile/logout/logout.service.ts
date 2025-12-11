import { Injectable } from '@nestjs/common';
import { AppType, LogType } from 'src/modules/logs/domain/entities/log.entity';
import { CreateLogService } from 'src/modules/logs/usecases/create-log/create-log.service';
import { Session } from 'src/types/session';
import { CacheStorage } from '../../../../../shared/ports/cache-storage';
import { getSessionStorageKey } from '../../../config/storage';

@Injectable()
export class LogoutService {
  constructor(
    private readonly cache: CacheStorage,
    private readonly createLogService: CreateLogService,
  ) {}

  async logout(sessionId: string) {
    const user = await this.cache.get<Session['user']>(
      getSessionStorageKey(sessionId),
    );
    await this.createLogService.execute(
      {
        appType: AppType.MOBILE,
        logType: LogType.LOGOUT,
        message: `Déconnexion de ${user?.email}`,
      },
      user!.id,
    );

    await this.cache.del(getSessionStorageKey(sessionId));
  }
}
