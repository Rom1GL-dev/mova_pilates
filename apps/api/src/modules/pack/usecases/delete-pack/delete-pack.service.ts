import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DeletePackDto } from './delete-pack.dto';
import { Session } from '../../../../types/session';
import { PackRepository } from '../../domain/repositories/pack.repository';

@Injectable()
export class DeletePackService {
  constructor(private readonly packRepository: PackRepository) {}

  async execute(data: DeletePackDto, user: Session['user']) {
    if (!user) {
      throw new UnauthorizedException(
        'Demande non autorisée. Veuillez vous connecter.',
      );
    }
    const userRow = await this.packRepository.delete(data.id);

    if (!userRow) {
      throw new Error("Le packs n'a pas pu être supprimé.");
    }
    return { message: 'Le packs a bien été supprimé.' };
  }
}
