import { Injectable, UnauthorizedException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Session } from '../../../../../types/session';
import { AppType, LogType } from '../../../../logs/domain/entities/log.entity';
import { CreateLogService } from '../../../../logs/usecases/create-log/create-log.service';
import { TypeCourse } from '../../../domain/entities/type-course.entity';
import { TypeCourseRepository } from '../../../domain/repositories/type-course.repository';
import { CreateTypeCourseDto } from './create-type-course.dto';

@Injectable()
export class CreateTypeCourseService {
  constructor(
    private readonly typeCourseRepository: TypeCourseRepository,
    private readonly createLogService: CreateLogService,
  ) {}

  async execute(data: CreateTypeCourseDto, user: Session['user']) {
    if (!user) {
      throw new UnauthorizedException(
        'Demande non autorisée. Veuillez vous connecter.',
      );
    }

    const typeCourseToSave: TypeCourse = {
      id: uuidv4(),
      label: data.label,
      capacity: data.capacity,
      image: data.image,
      description: data.description,
      createdAt: new Date(),
    };

    const typeCourseRaw =
      await this.typeCourseRepository.create(typeCourseToSave);

    if (!typeCourseRaw) {
      throw new Error("Le type de cours n'a pas pu être crée.");
    }

    await this.createLogService.execute(
      {
        appType: AppType.ADMIN,
        logType: LogType.ADD,
        message: `Type de cours : ${typeCourseRaw.label}`,
      },
      user.id,
    );
    return { message: 'Le type de cours a bien été crée.' };
  }
}
