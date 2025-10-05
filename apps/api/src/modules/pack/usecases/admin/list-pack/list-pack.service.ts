import { Injectable } from '@nestjs/common';
import { PackRepository } from '../../../domain/repositories/pack.repository';

@Injectable()
export class ListPackService {
  constructor(private readonly packRepository: PackRepository) {}

  execute() {
    return this.packRepository.findAll();
  }
}
