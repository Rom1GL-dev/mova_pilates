import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Session } from '../../../../../types/session';
import { DuplicateWeekDto } from './duplicate-week.dto';
import { PrismaService } from '../../../../../shared/infrastructure/prisma.service';
import { CreateLogService } from '../../../../logs/usecases/create-log/create-log.service';
import { AppType, LogType } from '../../../../logs/domain/entities/log.entity';
import { v4 as uuidv4 } from 'uuid';
import { addDays, differenceInDays, startOfWeek, endOfWeek } from 'date-fns';

@Injectable()
export class DuplicateWeekService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly createLogService: CreateLogService,
  ) {}

  async execute(data: DuplicateWeekDto, user: Session['user']) {
    if (!user) {
      throw new UnauthorizedException(
        'Demande non autorisée. Veuillez vous connecter.',
      );
    }

    // Calculate week boundaries (Monday to Sunday)
    const sourceStart = startOfWeek(data.sourceWeekStart, { weekStartsOn: 1 });
    const sourceEnd = endOfWeek(data.sourceWeekStart, { weekStartsOn: 1 });

    // Get all sessions from source week
    const sourceSessions = await this.prisma.session.findMany({
      where: {
        archivedAt: null,
        startDate: {
          gte: sourceStart,
          lte: sourceEnd,
        },
      },
      include: {
        typeCourse: true,
      },
    });

    if (sourceSessions.length === 0) {
      throw new Error('Aucune session trouvée pour la semaine source.');
    }

    // Calculate day offset between source and destination weeks
    const dayOffset = differenceInDays(
      data.destinationWeekStart,
      data.sourceWeekStart,
    );

    // Prepare new sessions with adjusted dates
    const newSessions = sourceSessions.map((session) => {
      const newStartDate = addDays(session.startDate, dayOffset);
      const newEndDate = addDays(session.endDate, dayOffset);

      return {
        id: uuidv4(),
        startDate: newStartDate,
        endDate: newEndDate,
        typeCourseId: session.typeCourseId,
        customCapacity: session.customCapacity,
        guestCount: 0, // Reset guest count for duplicated sessions
        createdAt: new Date(),
      };
    });

    // Use transaction to ensure atomicity
    const result = await this.prisma.$transaction(async (tx) => {
      // Create all sessions in batch
      await tx.session.createMany({
        data: newSessions,
      });

      return newSessions;
    });

    // Log the action
    await this.createLogService.execute(
      {
        appType: AppType.ADMIN,
        logType: LogType.ADD,
        message: `Duplication de semaine : ${sourceSessions.length} sessions dupliquées`,
      },
      user.id,
    );

    return {
      message: `${result.length} sessions ont été dupliquées avec succès.`,
      count: result.length,
      sessions: result,
    };
  }
}
