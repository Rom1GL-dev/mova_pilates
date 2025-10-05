import { Module } from '@nestjs/common';

import { SharedModule } from '../../shared/shared.module';
import { CreateTypeCourseService } from './usecases/admin/create-type-course/create-type-course.service';
import { DeleteTypeCourseService } from './usecases/admin/delete-type-course/delete-type-course.service';
import { ListTypeCourseService } from './usecases/admin/list-type-course/list-type-course.service';
import { UpdateTypeCourseService } from './usecases/admin/update-type-course/update-type-course.service';
import { CreateTypeCourseController } from './usecases/admin/create-type-course/create-type-course.controller';
import { ListTypeCourseController } from './usecases/admin/list-type-course/list-type-course.controller';
import { DeleteTypeCourseController } from './usecases/admin/delete-type-course/delete-type-course.controller';
import { UpdateTypeCourseController } from './usecases/admin/update-type-course/update-type-course.controller';
import { TypeCourseRepository } from './domain/repositories/type-course.repository';
import { TypeCoursePrismaRepository } from './infrastructure/repositories/course-type.prisma.repository';
import { GetTypeCourseService } from './usecases/admin/get-type-course/get-type-course.service';
import { GetTypeCourseController } from './usecases/admin/get-type-course/get-type-course.controller';
import { GetPacksByTypeCourseController } from './usecases/admin/get-packs-by-type-course/get-packs-by-type-course.controller';
import { GetPacksByTypeCourseService } from './usecases/admin/get-packs-by-type-course/get-packs-by-type-course.service';
import { LogModule } from '../logs/log.module';

@Module({
  imports: [SharedModule, LogModule],
  providers: [
    CreateTypeCourseService,
    DeleteTypeCourseService,
    ListTypeCourseService,
    UpdateTypeCourseService,
    GetTypeCourseService,
    GetPacksByTypeCourseService,
    {
      provide: TypeCourseRepository,
      useClass: TypeCoursePrismaRepository,
    },
  ],
  controllers: [
    CreateTypeCourseController,
    DeleteTypeCourseController,
    ListTypeCourseController,
    UpdateTypeCourseController,
    GetTypeCourseController,
    GetPacksByTypeCourseController,
  ],
  exports: [],
})
export class TypeCourseModule {}
