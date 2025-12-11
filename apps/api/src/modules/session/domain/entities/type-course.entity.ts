import { TYPE_COURSE } from '@mova_pilates/shared';
import { z } from 'zod';

export const TypeCourseSchema = z.object({
  id: z.string(),
  label: z.string(),
  capacity: z.number(),
  typeCourse: z.enum(TYPE_COURSE).optional(),
  image: z.string().nullable().optional(),
  description: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
});

export type TypeCourse = z.infer<typeof TypeCourseSchema>;
