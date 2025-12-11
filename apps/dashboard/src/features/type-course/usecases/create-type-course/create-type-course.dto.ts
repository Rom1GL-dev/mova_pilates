import { z } from 'zod';

export const createTypeCourseForm = z.object({
  label: z.string().min(1, 'Le nom du type de cours est requis'),
  capacity: z.number().min(1, 'Le nombre de personne maximum est requis'),
  description: z.string().min(1, 'La description est requise'),
  image: z.union([z.string(), z.instanceof(File)]).optional()
});

export const createTypeCourseDto = createTypeCourseForm.extend({
  id: z.string()
});

export type CreateTypeCourseForm = z.infer<typeof createTypeCourseForm>;
export type CreateTypeCourseDto = z.infer<typeof createTypeCourseDto>;
