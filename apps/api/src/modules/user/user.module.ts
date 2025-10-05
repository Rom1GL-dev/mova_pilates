import { Module } from '@nestjs/common';

import { SharedModule } from '../../shared/shared.module';
import { CreateUserService } from './usecases/admin/create-user/create-user.service';
import { DeleteUserService } from './usecases/admin/delete-user/delete-user.service';
import { ListUsersService } from './usecases/admin/list-users/list-users.service';
import { UpdateUserService } from './usecases/admin/update-user/update-user.service';
import { CreateUserController } from './usecases/admin/create-user/create-user.controller';
import { ListUsersController } from './usecases/admin/list-users/list-users.controller';
import { DeleteUserController } from './usecases/admin/delete-user/delete-user.controller';
import { UpdateUserController } from './usecases/admin/update-user/update-user.controller';
import { UserRepository } from './domain/repositories/user.repository';
import { UserPrismaRepository } from './infrastructure/repositories/user.prisma.repository';
import { GetUserService } from './usecases/admin/get-user/get-user.service';
import { GetUserController } from './usecases/admin/get-user/get-user.controller';
import { LogModule } from '../logs/log.module';

@Module({
  imports: [SharedModule, LogModule],
  providers: [
    CreateUserService,
    DeleteUserService,
    ListUsersService,
    UpdateUserService,
    GetUserService,
    {
      provide: UserRepository,
      useClass: UserPrismaRepository,
    },
  ],
  controllers: [
    CreateUserController,
    DeleteUserController,
    ListUsersController,
    UpdateUserController,
    GetUserController,
  ],
  exports: [],
})
export class UserModule {}
