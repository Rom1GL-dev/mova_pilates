import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/infrastructure/prisma.service';
import { Pack } from '../../domain/entities/pack.entity';
import { TypeCourse as TypeCourseEntity } from '../../domain/entities/type-course.entity';
import { TypeCourseRepository } from '../../domain/repositories/type-course.repository';

@Injectable()
export class TypeCoursePrismaRepository implements TypeCourseRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(includeArchived = false): Promise<TypeCourseEntity[]> {
    const typesCourse = await this.prisma.typeCourse.findMany({
      where: includeArchived ? {} : { archivedAt: null },
    });
    return typesCourse.map((u) => ({
      id: u.id,
      label: u.label,
      capacity: u.capacity,
      typeCourse: u.capacity > 1 ? 'COLLECTIVE' : 'INDIVIDUAL',
      image: u.image ?? undefined,
      description: u.description ?? undefined,
      createdAt: u.createdAt,
      updatedAt: u.updatedAt ?? undefined,
    }));
  }

  async create(typeCourse: TypeCourseEntity): Promise<TypeCourseEntity> {
    const createdTypeCourse = await this.prisma.typeCourse.create({
      data: {
        id: typeCourse.id,
        label: typeCourse.label,
        capacity: typeCourse.capacity,
        description: typeCourse.description ?? undefined,
        image: typeCourse.image ?? null,
      },
    });

    return {
      id: createdTypeCourse.id,
      label: typeCourse.label,
      capacity: typeCourse.capacity,
      image: createdTypeCourse.image ?? undefined,
      description: createdTypeCourse.description ?? undefined,
      createdAt: createdTypeCourse.createdAt,
      updatedAt: createdTypeCourse.updatedAt ?? undefined,
    };
  }

  async update(typeCourse: TypeCourseEntity): Promise<TypeCourseEntity> {
    const updatedTypeCourse = await this.prisma.typeCourse.update({
      where: { id: typeCourse.id },
      data: {
        label: typeCourse.label,
        capacity: typeCourse.capacity,
        image: typeCourse.image ?? undefined,
        description: typeCourse.description ?? undefined,
      },
    });

    return {
      id: updatedTypeCourse.id,
      label: updatedTypeCourse.label,
      capacity: updatedTypeCourse.capacity,
      image: updatedTypeCourse.image ?? undefined,
      description: updatedTypeCourse.description ?? undefined,
      createdAt: updatedTypeCourse.createdAt,
      updatedAt: updatedTypeCourse.updatedAt ?? undefined,
    };
  }

  async delete(id: string): Promise<TypeCourseEntity> {
    const deletedTypeCourse = await this.prisma.typeCourse.delete({
      where: { id },
    });

    return {
      id: deletedTypeCourse.id,
      label: deletedTypeCourse.label,
      capacity: deletedTypeCourse.capacity,
      createdAt: deletedTypeCourse.createdAt,
      image: deletedTypeCourse.image ?? undefined,
      description: deletedTypeCourse.description ?? undefined,
      updatedAt: deletedTypeCourse.updatedAt ?? undefined,
    };
  }

  async findById(id: string): Promise<TypeCourseEntity | null> {
    const typeCourseRaw = await this.prisma.typeCourse.findUnique({
      where: { id },
    });

    if (!typeCourseRaw) {
      return null;
    }

    return {
      ...typeCourseRaw,
      typeCourse: typeCourseRaw.capacity > 1 ? 'COLLECTIVE' : 'INDIVIDUAL',
      description: typeCourseRaw.description ?? undefined,
    };
  }

  async findByTypeCourseId(id: string): Promise<Pack[] | null> {
    return this.prisma.pack.findMany({
      where: {
        typeCourseId: id,
        archivedAt: null,
      },
      include: { typeCourse: true },
    });
  }
}
