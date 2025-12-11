import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../shared/infrastructure/prisma.service';

@Injectable()
export class GetTypeCourseMobileService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string) {
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
}
