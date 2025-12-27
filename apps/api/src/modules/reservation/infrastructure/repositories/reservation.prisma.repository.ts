import { Injectable } from '@nestjs/common';
import { ReservationRepository } from '../../domain/repositories/reservation.repository';
import { PrismaService } from '../../../../shared/infrastructure/prisma.service';
import { Reservation } from '../../domain/entities/reservation.entity';
import { AddReservationBySessionDto } from '../../usecases/admin/add-reservation-by-session/add-reservation-by-session.dto';

@Injectable()
export class TypeCoursePrismaRepository implements ReservationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Reservation[]> {
    return this.prisma.reservation.findMany({
      include: {
        user: true,
        session: true,
      },
    });
  }

  async create(pack: Reservation): Promise<Reservation> {
    return this.prisma.reservation.create({
      data: {
        id: pack.id,
        status: pack.status,
        userId: pack.userId,
        sessionId: pack.sessionId,
        createdAt: pack.createdAt,
        updatedAt: pack.updatedAt,
      },
      include: {
        user: true,
        session: true,
      },
    });
  }

  async update(pack: Reservation): Promise<Reservation> {
    return this.prisma.reservation.update({
      where: { id: pack.id },
      data: {
        status: pack.status,
        userId: pack.userId,
        sessionId: pack.sessionId,
        updatedAt: pack.updatedAt ?? new Date(),
      },
      include: {
        user: true,
        session: true,
      },
    });
  }

  async delete(id: string): Promise<Reservation> {
    return this.prisma.reservation.delete({
      where: { id },
      include: {
        user: true,
        session: true,
      },
    });
  }

  async findById(id: string): Promise<Reservation | null> {
    return this.prisma.reservation.findUnique({
      where: { id },
      include: {
        user: true,
        session: true,
      },
    });
  }

  async findByUserId(userId: string): Promise<Reservation[]> {
    return this.prisma.reservation.findMany({
      where: {
        userId,
        status: {
          not: 'CANCELLED',
        },
      },
      include: {
        user: true,
        session: {
          include: {
            typeCourse: true,
          },
        },
      },
    });
  }

  async addParticipant(data: AddReservationBySessionDto): Promise<Reservation> {
    return this.prisma.reservation.create({
      data: {
        sessionId: data.sessionId,
        userId: data.userId,
        status: 'CONFIRMED',
      },
      include: {
        user: true,
        session: true,
      },
    });
  }

  async findBySessionAndUserId(
    sessionId: string,
    userId: string,
  ): Promise<Reservation | null> {
    return this.prisma.reservation.findUnique({
      where: {
        sessionId_userId: { sessionId, userId },
      },
      include: {
        user: true,
        session: true,
      },
    });
  }
}
