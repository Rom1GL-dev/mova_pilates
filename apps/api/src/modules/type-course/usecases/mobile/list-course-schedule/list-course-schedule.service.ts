import { format } from 'date-fns';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../../shared/infrastructure/prisma.service';

@Injectable()
export class ListCourseScheduleService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(typeCourseId: string) {
    const baseCourse = await this.prisma.typeCourse.findUnique({
      where: { id: typeCourseId },
    });

    if (!baseCourse) {
      throw new NotFoundException('Type course not found');
    }

    const relatedCourses = await this.prisma.typeCourse.findMany({
      where: { label: baseCourse.label },
      include: {
        sessions: {
          where: {
            startDate: { gte: new Date() },
          },
          orderBy: { startDate: 'asc' },
        },
      },
    });

    const result: {
      id: string;
      label: string;
      image?: string;
      modes: Record<
        'collectif' | 'individuel',
        {
          enabled: boolean;
          sessionsByDay: Record<
            string,
            {
              id: string;
              startDate: Date;
              endDate: Date;
              available: boolean;
            }[]
          >;
        }
      >;
    } = {
      id: baseCourse.id,
      label: baseCourse.label,
      image: baseCourse.image ?? undefined,
      modes: {} as any,
    };

    for (const course of relatedCourses) {
      const mode: 'collectif' | 'individuel' =
        course.capacity > 1 ? 'collectif' : 'individuel';

      const sessionsByDay: Record<string, any[]> = {};

      for (const session of course.sessions) {
        const dayKey = format(session.startDate, 'yyyy-MM-dd');

        if (!sessionsByDay[dayKey]) {
          sessionsByDay[dayKey] = [];
        }

        const reservedCount = await this.prisma.reservation.count({
          where: {
            sessionId: session.id,
            status: { in: ['CONFIRMED', 'PRESENT'] },
          },
        });

        sessionsByDay[dayKey].push({
          id: session.id,
          startDate: session.startDate,
          endDate: session.endDate,
          available: reservedCount < course.capacity,
        });
      }

      result.modes[mode] = {
        enabled: true,
        sessionsByDay,
      };
    }

    if (!result.modes.collectif) {
      result.modes.collectif = { enabled: false, sessionsByDay: {} };
    }

    if (!result.modes.individuel) {
      result.modes.individuel = { enabled: false, sessionsByDay: {} };
    }

    return result;
  }
}
