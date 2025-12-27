import { Injectable } from '@nestjs/common';
import { PackRepository } from '../../../domain/repositories/pack.repository';

@Injectable()
export class GetPackMobileService {
  constructor(private readonly packRepository: PackRepository) {}

  execute(id: string) {
    return this.packRepository.findById(id);
  }
}
