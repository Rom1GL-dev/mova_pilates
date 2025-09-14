import { z } from 'zod';
import { TypeOfCourse } from '@/features/type-course/types/TTypeCourse.ts';

export const createTypeCourseForm = z.object({
  label: z.string().min(1, 'Le nom du type de cours est requis'),
  capacity: z.number().min(1, 'Le nombre de personne maximum est requis'),
  typeCourse: z.enum([TypeOfCourse.INDIVUDUAL, TypeOfCourse.COLLECTIVE])
});

export const createTypeCourseDto = createTypeCourseForm.extend({
  id: z.string()
});

export type CreateTypeCourseForm = z.infer<typeof createTypeCourseForm>;
export type CreateTypeCourseDto = z.infer<typeof createTypeCourseDto>;
