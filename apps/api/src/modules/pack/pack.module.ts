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

@Module({
  imports: [SharedModule],
  providers: [
    CreatePackService,
    DeletePackService,
    ListPackService,
    UpdatePackService,
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
  ],
  exports: [],
})
export class PackModule {}
