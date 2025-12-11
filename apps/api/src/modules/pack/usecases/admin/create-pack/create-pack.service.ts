import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Session } from '../../../../../types/session';
import { CreatePackDto } from './create-pack.dto';
import { PackRepository } from '../../../domain/repositories/pack.repository';
import { Pack } from '../../../domain/entities/pack.entity';
import { v4 as uuidv4 } from 'uuid';
import { AppType, LogType } from '../../../../logs/domain/entities/log.entity';
import { CreateLogService } from '../../../../logs/usecases/create-log/create-log.service';

@Injectable()
export class CreatePackService {
  constructor(
    private readonly packRepository: PackRepository,
    private readonly createLogService: CreateLogService,
  ) {}

  async execute(data: CreatePackDto, user: Session['user']) {
    if (!user) {
      throw new UnauthorizedException(
        'Demande non autorisée. Veuillez vous connecter.',
      );
    }

    const packToSave: Pack = {
      id: uuidv4(),
      label: data.label,
      typeCourseId: data.typeCourseId,
      nbCourse: data.nbCourse,
      price: data.price,
      createdAt: new Date(),
    };

    const packRow = await this.packRepository.create(packToSave);

    if (!packRow) {
      throw new Error('Une erreur est survenue lors de la création du packs.');
    }

    await this.createLogService.execute(
      {
        appType: AppType.ADMIN,
        logType: LogType.ADD,
        message: `Pack : ${packRow.label}`,
      },
      user.id,
    );

    return { message: 'Le packs a bien été crée.' };
  }
}
