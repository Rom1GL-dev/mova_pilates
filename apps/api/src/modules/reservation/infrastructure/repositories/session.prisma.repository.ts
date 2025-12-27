import { Injectable } from '@nestjs/common';
import { SessionRepository } from '../../domain/repositories/session.repository';
import { PrismaService } from '../../../../shared/infrastructure/prisma.service';
import { Session } from '../../domain/entities/session.entity';

@Injectable()
export class SessionPrismaRepository implements SessionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Session | null> {
    return this.prisma.session.findUnique({
      where: { id },
      include: {
        typeCourse: true,
      },
    });
  }
}
