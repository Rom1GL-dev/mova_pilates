import { Injectable } from '@nestjs/common';
import { Pack } from '../entities/pack.entity';

@Injectable()
export abstract class PackRepository {
  abstract create(pack: Pack): Promise<Pack>;
  abstract update(pack: Pack): Promise<Pack>;
  abstract findAll(): Promise<Pack[]>;
  abstract findById(id: string): Promise<Pack | null>;
  abstract delete(id: string): Promise<Pack>;
}
