import { Injectable } from '@nestjs/common';
import { SessionRepository } from '../../domain/repositories/session.repository';
import { PrismaService } from '../../../../shared/infrastructure/prisma.service';
import { Session } from '../../domain/entities/session.entity';

@Injectable()
export class SessionPrismaRepository implements SessionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Session[]> {
    return this.prisma.session.findMany({
      include: {
        typeCourse: true,
      },
    });
  }

  async create(pack: Session): Promise<Session> {
    const typeCourse = await this.prisma.typeCourse.findUnique({
      where: { id: pack.typeCourseId },
    });

    if (!typeCourse) {
      throw new Error('Type de cours non trouvé');
    }

    return this.prisma.session.create({
      data: {
        id: pack.id,
        startDate: pack.startDate,
        endDate: pack.endDate,
        typeCourseId: pack.typeCourseId,
        createdAt: pack.createdAt,
        updatedAt: pack.updatedAt,
      },
      include: {
        typeCourse: true,
      },
    });
  }

  async update(pack: Session): Promise<Session> {
    const typeCourse = await this.prisma.typeCourse.findUnique({
      where: { id: pack.typeCourseId },
    });

    if (!typeCourse) {
      throw new Error('Type de cours non trouvé');
    }

    return this.prisma.session.update({
      where: { id: pack.id },
      data: {
        startDate: pack.startDate,
        endDate: pack.endDate,
        typeCourseId: pack.typeCourseId,
        updatedAt: pack.updatedAt ?? new Date(),
      },
      include: {
        typeCourse: true,
      },
    });
  }

  async delete(id: string): Promise<Session> {
    return this.prisma.session.delete({
      where: { id },
      include: {
        typeCourse: true,
      },
    });
  }

  async findById(id: string): Promise<Session | null> {
    return this.prisma.session.findUnique({
      where: { id },
      include: {
        typeCourse: true,
      },
    });
  }
}
