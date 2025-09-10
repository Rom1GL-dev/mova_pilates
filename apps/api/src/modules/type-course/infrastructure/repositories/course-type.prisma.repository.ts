import { Injectable } from '@nestjs/common';
import { TypeCourseRepository } from '../../domain/repositories/type-course.repository';
import { PrismaService } from '../../../../shared/infrastructure/prisma.service';
import { TypeCourse as TypeCourseEntity } from '../../domain/entities/type-course.entity';

@Injectable()
export class TypeCoursePrismaRepository implements TypeCourseRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<TypeCourseEntity[]> {
    const typesCourse = await this.prisma.typeCourse.findMany({});
    return typesCourse.map((u) => ({
      id: u.id,
      label: u.label,
      typeCourse: u.typeCourse,
      capacity: u.capacity,
      createdAt: u.createdAt,
      updatedAt: u.updatedAt ?? undefined,
    }));
  }

  async create(typeCourse: TypeCourseEntity): Promise<TypeCourseEntity> {
    const createdTypeCourse = await this.prisma.typeCourse.create({
      data: {
        id: typeCourse.id,
        label: typeCourse.label,
        typeCourse: typeCourse.typeCourse,
        capacity: typeCourse.capacity,
      },
    });

    return {
      id: createdTypeCourse.id,
      label: typeCourse.label,
      typeCourse: typeCourse.typeCourse,
      capacity: typeCourse.capacity,
      createdAt: createdTypeCourse.createdAt,
      updatedAt: createdTypeCourse.updatedAt ?? undefined,
    };
  }

  async update(typeCourse: TypeCourseEntity): Promise<TypeCourseEntity> {
    const updatedTypeCourse = await this.prisma.typeCourse.update({
      where: { id: typeCourse.id },
      data: {
        label: typeCourse.label,
        typeCourse: typeCourse.typeCourse,
        capacity: typeCourse.capacity,
      },
    });

    return {
      id: updatedTypeCourse.id,
      label: updatedTypeCourse.label,
      typeCourse: updatedTypeCourse.typeCourse,
      capacity: updatedTypeCourse.capacity,
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
      typeCourse: deletedTypeCourse.typeCourse,
      capacity: deletedTypeCourse.capacity,
      createdAt: deletedTypeCourse.createdAt,
      updatedAt: deletedTypeCourse.updatedAt ?? undefined,
    };
  }
}
