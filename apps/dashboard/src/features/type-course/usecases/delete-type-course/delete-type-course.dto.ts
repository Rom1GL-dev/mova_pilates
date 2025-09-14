import { z } from 'zod';

export const DeleteTypeCourseDtoSchema = z.object({
  id: z.string()
});

export type DeleteTypeCourseDto = z.infer<typeof DeleteTypeCourseDtoSchema>;
