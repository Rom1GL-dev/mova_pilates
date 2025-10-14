import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Session } from '../../../../../types/session';
import { AppType, LogType } from '../../../../logs/domain/entities/log.entity';
import { CreateLogService } from '../../../../logs/usecases/create-log/create-log.service';
import { TypeCourse } from '../../../domain/entities/type-course.entity';
import { TypeCourseRepository } from '../../../domain/repositories/type-course.repository';
import { UpdateTypeCourseDto } from './update-type-course.dto';

@Injectable()
export class UpdateTypeCourseService {
  constructor(
    private readonly typeCourseRepository: TypeCourseRepository,
    private readonly createLogService: CreateLogService,
  ) {}

  async execute(data: UpdateTypeCourseDto, user: Session['user']) {
    if (!user) {
      throw new UnauthorizedException(
        'Demande non autorisée. Veuillez vous connecter.',
      );
    }

    const typeCourseToSave: TypeCourse = {
      id: data.id,
      label: data.label,
      capacity: data.capacity,
      createdAt: data.createdAt,
      updatedAt: new Date(),
    };

    const typeCourseRaw =
      await this.typeCourseRepository.update(typeCourseToSave);

    if (!typeCourseRaw) {
      throw new Error("Le type de cours n'a pas pu être modifié.");
    }

    await this.createLogService.execute(
      {
        appType: AppType.ADMIN,
        logType: LogType.UPDATE,
        message: `Type de cours : ${typeCourseRaw.label}`,
      },
      user,
    );

    return { message: 'Le type de cours a bien été modifié.' };
  }
}
