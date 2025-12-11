import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../shared/infrastructure/prisma.service';

@Injectable()
export class ListTypeCourseMobileService {
  constructor(private readonly prisma: PrismaService) {}

  async execute() {
    const typesCourse = await this.prisma.typeCourse.findMany({});

    const unique = new Map<string, (typeof typesCourse)[0]>();

    for (const item of typesCourse) {
      if (!unique.has(item.label)) {
        unique.set(item.label, item);
      }
    }

    return Array.from(unique.values()).map((u) => ({
      id: u.id,
      label: u.label,
      capacity: u.capacity,
      image: u.image ?? undefined,
      description: u.description ?? undefined,
      createdAt: u.createdAt,
      updatedAt: u.updatedAt ?? undefined,
    }));
  }
}
