import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UpdatePackDto } from './update-pack.dto';
import { Session } from '../../../../../types/session';
import { PackRepository } from '../../../domain/repositories/pack.repository';
import { Pack } from '../../../domain/entities/pack.entity';
import { AppType, LogType } from '../../../../logs/domain/entities/log.entity';
import { CreateLogService } from '../../../../logs/usecases/create-log/create-log.service';

@Injectable()
export class UpdatePackService {
  constructor(
    private readonly packRepository: PackRepository,
    private readonly createLogService: CreateLogService,
  ) {}

  async execute(data: UpdatePackDto, user: Session['user']) {
    if (!user) {
      throw new UnauthorizedException(
        'Demande non autorisée. Veuillez vous connecter.',
      );
    }

    const packToSave: Pack = {
      id: data.id,
      label: data.label,
      typeCourseId: data.typeCourseId,
      nbCourse: data.nbCourse,
      price: data.price,
      createdAt: data.createdAt,
      updatedAt: new Date(),
    };

    const packRow = await this.packRepository.update(packToSave);

    if (!packRow) {
      throw new Error("Le packs n'a pas pu être modifié.");
    }

    await this.createLogService.execute(
      {
        appType: AppType.ADMIN,
        logType: LogType.UPDATE,
        message: `Pack : ${packRow.label}`,
      },
      user,
    );
    return { message: 'Le packs a bien été modifié.' };
  }
}
