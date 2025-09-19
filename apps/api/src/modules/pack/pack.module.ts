import { Module } from '@nestjs/common';

import { SharedModule } from '../../shared/shared.module';
import { CreatePackService } from './usecases/create-pack/create-pack.service';
import { DeletePackService } from './usecases/delete-pack/delete-pack.service';
import { ListPackService } from './usecases/list-pack/list-pack.service';
import { UpdatePackService } from './usecases/update-pack/update-pack.service';
import { CreatePackController } from './usecases/create-pack/create-pack.controller';
import { ListPackController } from './usecases/list-pack/list-pack.controller';
import { DeletePackController } from './usecases/delete-pack/delete-pack.controller';
import { UpdatePackController } from './usecases/update-pack/update-pack.controller';
import { PackRepository } from './domain/repositories/pack.repository';
import { TypeCoursePrismaRepository } from './infrastructure/repositories/pack.prisma.repository';
import { GetPackService } from './usecases/get-pack/get-pack.service';
import { GetPackController } from './usecases/get-pack/get-pack.controller';

@Module({
  imports: [SharedModule],
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
