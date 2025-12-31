import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/infrastructure/prisma.service';
import { LegalType, UpdateLegalDto } from './update-legal.dto';

@Injectable()
export class LegalService {
  constructor(private readonly prisma: PrismaService) {}

  async get(type: LegalType) {
    const doc = await this.prisma.legalDocument.findUnique({
      where: { type },
    });

    return {
      content: doc?.content ?? '',
    };
  }

  async update({ type, content }: UpdateLegalDto) {
    await this.prisma.legalDocument.upsert({
      where: { type },
      update: { content },
      create: { type, content },
    });

    return { success: true };
  }
}
