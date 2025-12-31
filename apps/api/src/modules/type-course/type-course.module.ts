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
import { ListTypeCourseMobileService } from './usecases/mobile/list-type-course-mobile/list-type-course-mobile.service';
import { ListTypeCourseMobileController } from './usecases/mobile/list-type-course-mobile/list-type-course-mobile.controller';
import { GetTypeCourseMobileService } from './usecases/mobile/get-type-course-mobile/get-type-course-mobile.service';
import { GetTypeCourseMobileController } from './usecases/mobile/get-type-course-mobile/get-type-course-mobile.controller';
import { ListTypeCourseWithPacksController } from './usecases/mobile/list-type-course-with-packs/list-type-course-with-packs.controller';
import { ListTypeCourseWithPacksService } from './usecases/mobile/list-type-course-with-packs/list-type-course-with-packs.service';
import { ListCourseScheduleService } from './usecases/mobile/list-course-schedule/list-course-schedule.service';
import { ListCourseScheduleController } from './usecases/mobile/list-course-schedule/list-course-schedule.controller';

@Module({
  imports: [SharedModule, LogModule],
  providers: [
    CreateTypeCourseService,
    DeleteTypeCourseService,
    ListTypeCourseService,
    UpdateTypeCourseService,
    GetTypeCourseService,
    GetPacksByTypeCourseService,
    ListTypeCourseMobileService,
    GetTypeCourseMobileService,
    ListTypeCourseWithPacksService,
    ListCourseScheduleService,
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
    ListTypeCourseWithPacksController,
    GetTypeCourseController,
    GetPacksByTypeCourseController,
    ListTypeCourseMobileController,
    GetTypeCourseMobileController,
    ListCourseScheduleController,
  ],
  exports: [],
})
export class TypeCourseModule {}
