import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Session } from '../../../../types/session';
import { CreateTypeCourseDto } from './create-type-course.dto';
import { TypeCourseRepository } from '../../domain/repositories/type-course.repository';
import { TypeCourse } from '../../domain/entities/type-course.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CreateTypeCourseService {
  constructor(private readonly typeCourseRepository: TypeCourseRepository) {}

  async execute(data: CreateTypeCourseDto, user: Session['user']) {
    if (!user) {
      throw new UnauthorizedException(
        'Demande non autorisée. Veuillez vous connecter.',
      );
    }

    const typeCourseToSave: TypeCourse = {
      id: uuidv4(),
      label: data.label,
      typeCourse: data.typeCourse,
      capacity: data.capacity,
      createdAt: new Date(),
    };

    const typeCoureRaw =
      await this.typeCourseRepository.create(typeCourseToSave);

    if (!typeCoureRaw) {
      throw new Error("Le type de cours n'a pas pu être crée.");
    }
    return { message: 'Le type de cours a bien été crée.' };
  }
}
