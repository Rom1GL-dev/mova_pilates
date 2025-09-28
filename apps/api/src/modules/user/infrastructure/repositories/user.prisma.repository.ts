import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { PrismaService } from '../../../../shared/infrastructure/prisma.service';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class UserPrismaRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany({});
    return users.map((u) => ({
      id: u.id,
      firstname: u.firstname,
      lastname: u.lastname ?? '',
      email: u.email,
      password: u.password,
      role: u.role,
      tel: u.tel,
      dob: u.dob,
      createdAt: u.createdAt,
      updatedAt: u.updatedAt ?? undefined,
    }));
  }

  async create(user: User): Promise<User> {
    const createdUser = await this.prisma.user.create({
      data: {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
        role: user.role,
        tel: user.tel,
        dob: user.dob,
      },
    });

    return {
      id: createdUser.id,
      firstname: createdUser.firstname,
      lastname: createdUser.lastname,
      email: createdUser.email,
      password: createdUser.password,
      role: createdUser.role,
      tel: createdUser.tel,
      dob: createdUser.dob,
      createdAt: createdUser.createdAt,
      updatedAt: createdUser.updatedAt ?? undefined,
    };
  }

  async update(user: User): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
        role: user.role,
        tel: user.tel,
        dob: user.dob,
      },
    });

    return {
      id: updatedUser.id,
      firstname: updatedUser.firstname,
      lastname: updatedUser.lastname,
      email: updatedUser.email,
      password: updatedUser.password,
      role: updatedUser.role,
      tel: updatedUser.tel,
      dob: updatedUser.dob,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt ?? undefined,
    };
  }

  async delete(id: string): Promise<User> {
    const deletedUser = await this.prisma.user.delete({
      where: { id },
    });

    return {
      id: deletedUser.id,
      email: deletedUser.email,
      password: deletedUser.password,
      firstname: deletedUser.firstname,
      lastname: deletedUser.lastname,
      role: deletedUser.role,
      tel: deletedUser.tel,
      dob: deletedUser.dob,
      createdAt: deletedUser.createdAt,
      updatedAt: deletedUser.updatedAt ?? undefined,
    };
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
}
