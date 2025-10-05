import { Module } from '@nestjs/common';

import { SharedModule } from '../../shared/shared.module';
import { CreatePackService } from './usecases/admin/create-pack/create-pack.service';
import { DeletePackService } from './usecases/admin/delete-pack/delete-pack.service';
import { ListPackService } from './usecases/admin/list-pack/list-pack.service';
import { UpdatePackService } from './usecases/admin/update-pack/update-pack.service';
import { CreatePackController } from './usecases/admin/create-pack/create-pack.controller';
import { ListPackController } from './usecases/admin/list-pack/list-pack.controller';
import { DeletePackController } from './usecases/admin/delete-pack/delete-pack.controller';
import { UpdatePackController } from './usecases/admin/update-pack/update-pack.controller';
import { PackRepository } from './domain/repositories/pack.repository';
import { TypeCoursePrismaRepository } from './infrastructure/repositories/pack.prisma.repository';
import { GetPackService } from './usecases/admin/get-pack/get-pack.service';
import { GetPackController } from './usecases/admin/get-pack/get-pack.controller';
import { LogModule } from '../logs/log.module';

@Module({
  imports: [SharedModule, LogModule],
  providers: [
    CreatePackService,
    DeletePackService,
    ListPackService,
    UpdatePackService,
    GetPackService,
    {
      provide: PackRepository,
      useClass: TypeCoursePrismaRepository,
    },
  ],
  controllers: [
    CreatePackController,
    DeletePackController,
    ListPackController,
    UpdatePackController,
    GetPackController,
  ],
  exports: [],
})
export class PackModule {}
