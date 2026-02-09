import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DeleteSessionDto } from './delete-session.dto';
import { Session } from '../../../../../types/session';
import { AppType, LogType } from '../../../../logs/domain/entities/log.entity';
import { CreateLogService } from '../../../../logs/usecases/create-log/create-log.service';
import { PrismaService } from '../../../../../shared/infrastructure/prisma.service';

@Injectable()
export class DeleteSessionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly createLogService: CreateLogService,
  ) {}

  async execute(data: DeleteSessionDto, user: Session['user']) {
    if (!user) {
      throw new UnauthorizedException(
        'Demande non autorisée. Veuillez vous connecter.',
      );
    }

    const session = await this.prisma.session.findUnique({
      where: { id: data.id },
    });

    if (!session) {
      throw new NotFoundException('Session introuvable.');
    }

    if (session.archivedAt) {
      throw new BadRequestException('Cette session est déjà archivée.');
    }

    // Archiver la session au lieu de la supprimer
    await this.prisma.session.update({
      where: { id: data.id },
      data: { archivedAt: new Date() },
    });

    await this.createLogService.execute(
      {
        appType: AppType.ADMIN,
        logType: LogType.DELETE,
        message: `Session archivée : ${session.startDate.toISOString()} - ${session.endDate.toISOString()}`,
      },
      user.id,
    );

    return { message: 'La session a bien été archivée.' };
  }
}
