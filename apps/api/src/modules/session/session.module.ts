import { Module } from '@nestjs/common';

import { SharedModule } from '../../shared/shared.module';
import { CreateSessionService } from './usecases/create-session/create-session.service';
import { DeleteSessionService } from './usecases/delete-session/delete-session.service';
import { ListSessionService } from './usecases/list-session/list-session.service';
import { UpdateSessionService } from './usecases/update-session/update-session.service';
import { CreateSessionController } from './usecases/create-session/create-session.controller';
import { ListSessionController } from './usecases/list-session/list-session.controller';
import { DeleteSessionController } from './usecases/delete-session/delete-session.controller';
import { UpdateSessionController } from './usecases/update-session/update-session.controller';
import { SessionRepository } from './domain/repositories/session.repository';
import { SessionPrismaRepository } from './infrastructure/repositories/session.prisma.repository';
import { GetSessionService } from './usecases/get-session/get-session.service';
import { GetSessionController } from './usecases/get-session/get-session.controller';

@Module({
  imports: [SharedModule],
  providers: [
    CreateSessionService,
    DeleteSessionService,
    ListSessionService,
    UpdateSessionService,
    GetSessionService,
    {
      provide: SessionRepository,
      useClass: SessionPrismaRepository,
    },
  ],
  controllers: [
    CreateSessionController,
    DeleteSessionController,
    ListSessionController,
    UpdateSessionController,
    GetSessionController,
  ],
  exports: [],
})
export class SessionModule {}
