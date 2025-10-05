import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DeleteTypeCourseDto } from './delete-type-course.dto';
import { Session } from '../../../../../types/session';
import { TypeCourseRepository } from '../../../domain/repositories/type-course.repository';
import { CreateLogService } from '../../../../logs/usecases/create-log/create-log.service';
import { AppType, LogType } from '../../../../logs/domain/entities/log.entity';

@Injectable()
export class DeleteTypeCourseService {
  constructor(
    private readonly typeCourse: TypeCourseRepository,
    private readonly createLogService: CreateLogService,
  ) {}

  async execute(data: DeleteTypeCourseDto, user: Session['user']) {
    if (!user) {
      throw new UnauthorizedException(
        'Demande non autorisée. Veuillez vous connecter.',
      );
    }
    const typeCourseRaw = await this.typeCourse.delete(data.id);

    if (!typeCourseRaw) {
      throw new Error("Le type de cours n'a pas pu être supprimé.");
    }

    await this.createLogService.execute(
      {
        appType: AppType.ADMIN,
        logType: LogType.DELETE,
        message: `Type de cours : ${typeCourseRaw.label}`,
      },
      user,
    );

    return { message: 'Le type de cours a bien été supprimé.' };
  }
}
