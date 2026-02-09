import { Injectable } from '@nestjs/common';
import { PackRepository } from '../../domain/repositories/pack.repository';
import { PrismaService } from '../../../../shared/infrastructure/prisma.service';
import { Pack } from '../../domain/entities/pack.entity';

@Injectable()
export class TypeCoursePrismaRepository implements PackRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(includeArchived = false): Promise<Pack[]> {
    return this.prisma.pack.findMany({
      where: includeArchived ? {} : { archivedAt: null },
      include: {
        typeCourse: true,
      },
    });
  }

  async create(pack: Pack): Promise<Pack> {
    return this.prisma.pack.create({
      data: {
        id: pack.id,
        label: pack.label,
        typeCourseId: pack.typeCourseId,
        nbCourse: pack.nbCourse,
        price: pack.price,
        createdAt: pack.createdAt,
        updatedAt: pack.updatedAt,
      },
      include: {
        typeCourse: true,
      },
    });
  }

  async update(pack: Pack): Promise<Pack> {
    return this.prisma.pack.update({
      where: { id: pack.id },
      data: {
        label: pack.label,
        typeCourseId: pack.typeCourseId,
        nbCourse: pack.nbCourse,
        price: pack.price,
        updatedAt: pack.updatedAt ?? new Date(),
      },
      include: {
        typeCourse: true,
      },
    });
  }

  async delete(id: string): Promise<Pack> {
    return this.prisma.pack.delete({
      where: { id },
      include: {
        typeCourse: true,
      },
    });
  }

  async findById(id: string): Promise<Pack | null> {
    return this.prisma.pack.findFirst({
      where: { id, archivedAt: null },
      include: {
        typeCourse: true,
      },
    });
  }
}
