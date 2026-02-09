// list-type-course-with-packs.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../shared/infrastructure/prisma.service';

@Injectable()
export class ListTypeCourseWithPacksService {
  constructor(private readonly prisma: PrismaService) {}

  async execute() {
    const typesCourse = await this.prisma.typeCourse.findMany({
      where: { archivedAt: null },
      include: {
        packs: {
          where: { archivedAt: null },
          orderBy: {
            nbCourse: 'asc',
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return typesCourse.map((type) => {
      const mode = type.capacity === 1 ? 'Individuel' : 'Collectif';

      return {
        id: type.id,
        label: `${type.label} - ${mode}`,
        baseLabel: type.label,
        mode,
        capacity: type.capacity,
        description: type.description,
        image: type.image,
        packs: type.packs.map((pack) => ({
          id: pack.id,
          label: pack.label,
          nbCourse: pack.nbCourse,
          price: pack.price,
        })),
      };
    });
  }
}
