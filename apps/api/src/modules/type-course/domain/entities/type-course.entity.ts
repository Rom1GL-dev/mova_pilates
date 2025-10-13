import { z } from 'zod';

export const TypeCourseSchema = z.object({
  id: z.string(),
  label: z.string(),
  capacity: z.number(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
});

export type TypeCourse = z.infer<typeof TypeCourseSchema>;
