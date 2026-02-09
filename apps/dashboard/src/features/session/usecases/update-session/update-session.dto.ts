import { z } from 'zod';

export const updateSessionForm = z.object({
  id: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  typeCourseId: z.string().optional(),
  customCapacity: z.number().optional(),
  guestCount: z.number().optional()
});

export const updateSessionDto = updateSessionForm.extend({
  id: z.string()
});

export type UpdateSessionForm = z.infer<typeof updateSessionForm>;
export type UpdateSessionDto = z.infer<typeof updateSessionDto>;
