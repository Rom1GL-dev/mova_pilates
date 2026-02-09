import { z } from 'zod';

export const SessionSchema = z.object({
  id: z.string(),
  typeCourseId: z.string(),
  typeCourse: z
    .object({
      capacity: z.number(),
    })
    .optional(),
  startDate: z.date(),
  endDate: z.date(),
  customCapacity: z.number().nullable().optional(),
  guestCount: z.number().default(0),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
});

export type Session = z.infer<typeof SessionSchema>;
