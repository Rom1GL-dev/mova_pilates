import { Module } from '@nestjs/common';

import { SharedModule } from '../../shared/shared.module';
import { CreateTypeCourseService } from './usecases/create-type-course/create-type-course.service';
import { DeleteTypeCourseService } from './usecases/delete-type-course/delete-type-course.service';
import { ListTypeCourseService } from './usecases/list-type-course/list-type-course.service';
import { UpdateTypeCourseService } from './usecases/update-type-course/update-type-course.service';
import { CreateTypeCourseController } from './usecases/create-type-course/create-type-course.controller';
import { ListTypeCourseController } from './usecases/list-type-course/list-type-course.controller';
import { DeleteTypeCourseController } from './usecases/delete-type-course/delete-type-course.controller';
import { UpdateTypeCourseController } from './usecases/update-type-course/update-type-course.controller';
import { TypeCourseRepository } from './domain/repositories/type-course.repository';
import { TypeCoursePrismaRepository } from './infrastructure/repositories/course-type.prisma.repository';
import { GetTypeCourseService } from './usecases/get-type-course/get-type-course.service';
import { GetTypeCourseController } from './usecases/get-type-course/get-type-course.controller';

@Module({
  imports: [SharedModule],
  providers: [
    CreateTypeCourseService,
    DeleteTypeCourseService,
    ListTypeCourseService,
    UpdateTypeCourseService,
    GetTypeCourseService,
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
  ],
  exports: [],
})
export class TypeCourseModule {}
