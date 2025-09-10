import { z } from 'zod';

export const SessionSchema = z.object({
  id: z.string(),
  typeCourseId: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
});

export type Session = z.infer<typeof SessionSchema>;
