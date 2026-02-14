import { Module } from '@nestjs/common';

import { SharedModule } from '../../shared/shared.module';
import { CreateSessionService } from './usecases/admin/create-session/create-session.service';
import { DeleteSessionService } from './usecases/admin/delete-session/delete-session.service';
import { ListSessionService } from './usecases/admin/list-session/list-session.service';
import { UpdateSessionService } from './usecases/admin/update-session/update-session.service';
import { CreateSessionController } from './usecases/admin/create-session/create-session.controller';
import { ListSessionController } from './usecases/admin/list-session/list-session.controller';
import { DeleteSessionController } from './usecases/admin/delete-session/delete-session.controller';
import { UpdateSessionController } from './usecases/admin/update-session/update-session.controller';
import { SessionRepository } from './domain/repositories/session.repository';
import { SessionPrismaRepository } from './infrastructure/repositories/session.prisma.repository';
import { GetSessionService } from './usecases/admin/get-session/get-session.service';
import { GetSessionController } from './usecases/admin/get-session/get-session.controller';
import { LogModule } from '../logs/log.module';
import { ListSessionByTypeCourseService } from './usecases/mobile/list-session-by-type-course/list-session-by-type-course.service';
import { ListSessionByTypeCourseController } from './usecases/mobile/list-session-by-type-course/list-session-by-type-course.controller';
import { DuplicateWeekService } from './usecases/admin/duplicate-week/duplicate-week.service';
import { DuplicateWeekController } from './usecases/admin/duplicate-week/duplicate-week.controller';

@Module({
  imports: [SharedModule, LogModule],
  providers: [
    CreateSessionService,
    DeleteSessionService,
    ListSessionService,
    UpdateSessionService,
    GetSessionService,
    ListSessionByTypeCourseService,
    DuplicateWeekService,
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
    ListSessionByTypeCourseController,
    DuplicateWeekController,
  ],
  exports: [],
})
export class SessionModule {}
