import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../domain/repositories/user.repository';

@Injectable()
export class GetUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string) {
    return this.userRepository.findById(id);
  }
}
