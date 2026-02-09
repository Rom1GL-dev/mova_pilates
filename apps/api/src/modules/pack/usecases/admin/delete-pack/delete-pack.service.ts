import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DeletePackDto } from './delete-pack.dto';
import { Session } from '../../../../../types/session';
import { AppType, LogType } from '../../../../logs/domain/entities/log.entity';
import { CreateLogService } from '../../../../logs/usecases/create-log/create-log.service';
import { PrismaService } from '../../../../../shared/infrastructure/prisma.service';

@Injectable()
export class DeletePackService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly createLogService: CreateLogService,
  ) {}

  async execute(data: DeletePackDto, user: Session['user']) {
    if (!user) {
      throw new UnauthorizedException(
        'Demande non autorisée. Veuillez vous connecter.',
      );
    }

    const pack = await this.prisma.pack.findUnique({
      where: { id: data.id },
    });

    if (!pack) {
      throw new NotFoundException('Pack introuvable.');
    }

    if (pack.archivedAt) {
      throw new BadRequestException('Ce pack est déjà archivé.');
    }

    // Archiver le pack au lieu de le supprimer
    await this.prisma.pack.update({
      where: { id: data.id },
      data: { archivedAt: new Date() },
    });

    await this.createLogService.execute(
      {
        appType: AppType.ADMIN,
        logType: LogType.DELETE,
        message: `Pack archivé : ${pack.label}`,
      },
      user.id,
    );

    return { message: 'Le pack a bien été archivé.' };
  }
}
