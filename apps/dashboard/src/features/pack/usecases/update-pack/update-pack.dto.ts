import { z } from 'zod';

export const updatePackForm = z.object({
  label: z.string().min(1, 'Le nom du type de pack est requis'),
  price: z.number().min(1, 'Le prix est requis'),
  nbCourse: z.number().min(1, 'Le nombre de cours est requis'),
  typeCourseId: z.string()
});

export const updatePackDto = updatePackForm.extend({
  id: z.string()
});

export type UpdatePackForm = z.infer<typeof updatePackForm>;
export type UpdatePackDto = z.infer<typeof updatePackDto>;
