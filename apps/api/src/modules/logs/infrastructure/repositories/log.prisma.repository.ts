import { Injectable } from '@nestjs/common';
import { LogRepository } from '../../domain/repositories/log.repository';
import { PrismaService } from '../../../../shared/infrastructure/prisma.service';
import { AppType, Log, LogType } from '../../domain/entities/log.entity';

@Injectable()
export class LogPrismaRepository implements LogRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Log[]> {
    const logs = await this.prisma.log.findMany({
      include: { User: true },
    });

    return logs.map((log) => ({
      id: log.id,
      appType: log.appType as AppType,
      logType: log.logType as LogType,
      userId: log.userId,
      message: log.message,
      createdAt: log.createdAt,
    }));
  }

  async create(log: Log): Promise<Log> {
    const created = await this.prisma.log.create({
      data: {
        id: log.id,
        appType: log.appType as any,
        logType: log.logType as any,
        userId: log.userId,
        message: log.message,
        createdAt: log.createdAt,
      },
    });

    return {
      id: created.id,
      appType: created.appType as AppType,
      logType: created.logType as LogType,
      userId: created.userId,
      message: created.message,
      createdAt: created.createdAt,
    };
  }

  async findById(id: string): Promise<Log | null> {
    const log = await this.prisma.log.findUnique({
      where: { id },
      include: { User: true },
    });

    if (!log) return null;

    return {
      id: log.id,
      appType: log.appType as AppType,
      logType: log.logType as LogType,
      userId: log.userId,
      message: log.message,
      createdAt: log.createdAt,
    };
  }
}
