import { z } from 'zod';
import { TypeOfCourse } from '@/features/type-course/types/TTypeCourse.ts';

export const updateTypeCourseForm = z.object({
  label: z.string().min(1, 'Le nom du type de cours est requis').optional(),
  capacity: z
    .number()
    .min(1, 'Le nombre de personne maximum est requis')
    .optional(),
  typeCourse: z
    .enum([TypeOfCourse.INDIVUDUAL, TypeOfCourse.COLLECTIVE])
    .optional()
});

export const updateTypeCourseDto = updateTypeCourseForm.extend({
  id: z.string()
});

export type UpdateTypeCourseForm = z.infer<typeof updateTypeCourseForm>;
export type UpdateTypeCourseDto = z.infer<typeof updateTypeCourseDto>;
