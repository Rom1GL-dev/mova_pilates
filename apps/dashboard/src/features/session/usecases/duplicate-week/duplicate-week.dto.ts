import { z } from 'zod';

export const DuplicateWeekDtoSchema = z.object({
  sourceWeekStart: z.date(),
  destinationWeekStart: z.date(),
});

export type DuplicateWeekDto = z.infer<typeof DuplicateWeekDtoSchema>;
