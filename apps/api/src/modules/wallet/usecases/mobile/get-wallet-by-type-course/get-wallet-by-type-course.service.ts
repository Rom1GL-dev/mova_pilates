import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Session } from '../../../../../types/session';
import { PrismaService } from '../../../../../shared/infrastructure/prisma.service';

@Injectable()
export class GetWalletByTypeCourseService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(typeCourseId: string, user: Session['user']) {
    if (!user) {
      throw new UnauthorizedException('Veuillez vous connecter.');
    }

    const baseCourse = await this.prisma.typeCourse.findUnique({
      where: { id: typeCourseId },
    });

    if (!baseCourse) return null;

    const relatedCourses = await this.prisma.typeCourse.findMany({
      where: { label: baseCourse.label },
    });

    const wallets = await this.prisma.wallet.findMany({
      where: {
        userId: user.id,
        typeCourseId: { in: relatedCourses.map((c) => c.id) },
      },
    });

    const result: any = {};

    for (const course of relatedCourses) {
      const mode = course.capacity > 1 ? 'collectif' : 'individuel';
      const wallet = wallets.find((w) => w.typeCourseId === course.id);

      result[mode] = wallet ? { balance: wallet.balance } : { balance: 0 };
    }

    return result;
  }
}
