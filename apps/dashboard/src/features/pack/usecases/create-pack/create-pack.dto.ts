import { z } from 'zod';

export const createPackForm = z.object({
  label: z.string().min(1, 'Le nom du type de pack est requis'),
  price: z.number().min(1, 'Le prix est requis'),
  nbCourse: z.number().min(1, 'Le nombre de cours est requis'),
  typeCourseId: z.string()
});

export const createPackDto = createPackForm.extend({
  id: z.string()
});

export type CreatePackForm = z.infer<typeof createPackForm>;
export type CreatePackDto = z.infer<typeof createPackDto>;
