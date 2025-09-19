import { z } from 'zod';

export const createSessionForm = z.object({
  startDate: z.date(),
  endDate: z.date(),
  typeCourseId: z.string()
});

export const createSessionDto = createSessionForm.extend({
  id: z.string()
});

export type CreateSessionForm = z.infer<typeof createSessionForm>;
export type CreateSessionDto = z.infer<typeof createSessionDto>;
