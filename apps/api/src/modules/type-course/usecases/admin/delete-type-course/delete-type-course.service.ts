import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DeleteTypeCourseDto } from './delete-type-course.dto';
import { Session } from '../../../../../types/session';
import { CreateLogService } from '../../../../logs/usecases/create-log/create-log.service';
import { AppType, LogType } from '../../../../logs/domain/entities/log.entity';
import { PrismaService } from '../../../../../shared/infrastructure/prisma.service';

@Injectable()
export class DeleteTypeCourseService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly createLogService: CreateLogService,
  ) {}

  async execute(data: DeleteTypeCourseDto, user: Session['user']) {
    if (!user) {
      throw new UnauthorizedException(
        'Demande non autorisée. Veuillez vous connecter.',
      );
    }

    const typeCourse = await this.prisma.typeCourse.findUnique({
      where: { id: data.id },
    });

    if (!typeCourse) {
      throw new NotFoundException('Type de cours introuvable.');
    }

    if (typeCourse.archivedAt) {
      throw new BadRequestException('Ce type de cours est déjà archivé.');
    }

    // Archiver le type de cours au lieu de le supprimer
    await this.prisma.typeCourse.update({
      where: { id: data.id },
      data: { archivedAt: new Date() },
    });

    await this.createLogService.execute(
      {
        appType: AppType.ADMIN,
        logType: LogType.DELETE,
        message: `Type de cours archivé : ${typeCourse.label}`,
      },
      user.id,
    );

    return { message: 'Le type de cours a bien été archivé.' };
  }
}
