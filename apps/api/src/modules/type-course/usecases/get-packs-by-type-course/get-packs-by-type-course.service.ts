import { Injectable } from '@nestjs/common';
import { TypeCourseRepository } from '../../domain/repositories/type-course.repository';

@Injectable()
export class GetPacksByTypeCourseService {
  constructor(private readonly typeCourseRepository: TypeCourseRepository) {}

  execute(id: string) {
    return this.typeCourseRepository.findByTypeCourseId(id);
  }
}
