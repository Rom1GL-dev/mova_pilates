import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DeletePackDto } from './delete-pack.dto';
import { Session } from '../../../../../types/session';
import { PackRepository } from '../../../domain/repositories/pack.repository';
import { AppType, LogType } from '../../../../logs/domain/entities/log.entity';
import { CreateLogService } from '../../../../logs/usecases/create-log/create-log.service';

@Injectable()
export class DeletePackService {
  constructor(
    private readonly packRepository: PackRepository,
    private readonly createLogService: CreateLogService,
  ) {}

  async execute(data: DeletePackDto, user: Session['user']) {
    if (!user) {
      throw new UnauthorizedException(
        'Demande non autorisée. Veuillez vous connecter.',
      );
    }
    const packRow = await this.packRepository.delete(data.id);

    if (!packRow) {
      throw new Error("Le packs n'a pas pu être supprimé.");
    }

    await this.createLogService.execute(
      {
        appType: AppType.ADMIN,
        logType: LogType.DELETE,
        message: `Pack : ${packRow.label}`,
      },
      user,
    );
    return { message: 'Le packs a bien été supprimé.' };
  }
}
