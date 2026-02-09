import { Injectable } from '@nestjs/common';
import { TypeCourse } from '../entities/type-course.entity';
import { Pack } from '../entities/pack.entity';

@Injectable()
export abstract class TypeCourseRepository {
  abstract create(pack: TypeCourse): Promise<TypeCourse>;
  abstract update(pack: TypeCourse): Promise<TypeCourse>;
  abstract findAll(includeArchived?: boolean): Promise<TypeCourse[]>;
  abstract delete(id: string): Promise<TypeCourse>;
  abstract findById(id: string): Promise<TypeCourse | null>;
  abstract findByTypeCourseId(id: string): Promise<Pack[] | null>;
}
