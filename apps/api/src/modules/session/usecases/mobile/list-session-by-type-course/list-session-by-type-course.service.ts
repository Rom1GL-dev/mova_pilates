import { Injectable } from '@nestjs/common';
import { SessionRepository } from '../../../domain/repositories/session.repository';

@Injectable()
export class ListSessionByTypeCourseService {
  constructor(private readonly sessionRepository: SessionRepository) {}

  async execute(typeCourseId: string) {
    const sessions =
      await this.sessionRepository.findByTypeCourseId(typeCourseId);

    const now = new Date();

    const result = {
      INDIVIDUAL: [] as { date: string; slots: string[] }[],
      COLLECTIVE: [] as { date: string; slots: string[] }[],
    };

    for (const session of sessions) {
      if (session.endDate <= now) {
        continue;
      }

      const date = session.startDate.toISOString().split('T')[0];

      const slot = `${this.formatTime(session.startDate)} - ${this.formatTime(
        session.endDate,
      )}`;

      const key =
        session.typeCourse?.capacity === 1 ? 'INDIVIDUAL' : 'COLLECTIVE';

      let dateGroup = result[key].find((d) => d.date === date);

      if (!dateGroup) {
        dateGroup = { date, slots: [] };
        result[key].push(dateGroup);
      }

      dateGroup.slots.push(slot);
    }

    return result;
  }

  private formatTime(date: Date): string {
    return date.toISOString().substring(11, 16);
  }
}
