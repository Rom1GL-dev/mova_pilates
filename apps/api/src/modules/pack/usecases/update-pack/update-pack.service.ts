import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UpdatePackDto } from './update-pack.dto';
import { Session } from '../../../../types/session';
import { PackRepository } from '../../domain/repositories/pack.repository';
import { Pack } from '../../domain/entities/pack.entity';

@Injectable()
export class UpdatePackService {
  constructor(private readonly packRepository: PackRepository) {}

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

    const userRow = await this.packRepository.update(packToSave);

    if (!userRow) {
      throw new Error("Le pack n'a pas pu être modifié.");
    }
    return { message: 'Le pack a bien été modifié.' };
  }
}
