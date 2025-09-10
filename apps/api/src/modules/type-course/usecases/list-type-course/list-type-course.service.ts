import { Injectable } from '@nestjs/common';
import { TypeCourseRepository } from '../../domain/repositories/type-course.repository';

@Injectable()
export class ListTypeCourseService {
  constructor(private readonly typeCourseRepository: TypeCourseRepository) {}

  execute() {
    return this.typeCourseRepository.findAll();
  }
}
