import { Injectable } from '@nestjs/common';
import { PackRepository } from '../../domain/repositories/pack.repository';

@Injectable()
export class GetPackService {
  constructor(private readonly packRepository: PackRepository) {}

  execute(id: string) {
    return this.packRepository.findById(id);
  }
}
