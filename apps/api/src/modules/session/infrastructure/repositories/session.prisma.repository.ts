import { Injectable } from '@nestjs/common';
import { SessionRepository } from '../../domain/repositories/session.repository';
import { PrismaService } from '../../../../shared/infrastructure/prisma.service';
import { Session } from '../../domain/entities/session.entity';

@Injectable()
export class SessionPrismaRepository implements SessionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(includeArchived = false): Promise<Session[]> {
    return this.prisma.session.findMany({
      where: includeArchived ? {} : { archivedAt: null },
      include: {
        typeCourse: true,
      },
    });
  }

  async create(session: Session): Promise<Session> {
    return this.prisma.session.create({
      data: {
        id: session.id,
        startDate: session.startDate,
        endDate: session.endDate,
        typeCourseId: session.typeCourseId,
        customCapacity: session.customCapacity,
        guestCount: session.guestCount,
        createdAt: session.createdAt,
        updatedAt: session.updatedAt,
      },
      include: {
        typeCourse: true,
      },
    });
  }

  async update(session: Session): Promise<Session> {
    return this.prisma.session.update({
      where: { id: session.id },
      data: {
        startDate: session.startDate,
        endDate: session.endDate,
        typeCourseId: session.typeCourseId,
        customCapacity: session.customCapacity,
        guestCount: session.guestCount,
        updatedAt: session.updatedAt ?? new Date(),
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

  async findByTypeCourseId(typeCourseId: string): Promise<Session[]> {
    return this.prisma.session.findMany({
      where: { typeCourseId: typeCourseId, archivedAt: null },
      include: {
        typeCourse: true,
      },
    });
  }
}
