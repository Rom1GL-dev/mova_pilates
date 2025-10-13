import { z } from 'zod';

export const PackSchema = z.object({
  id: z.string(),
  label: z.string(),
  typeCourseId: z.string(),
  nbCourse: z.number(),
  price: z.number(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
});

export type Pack = z.infer<typeof PackSchema>;
