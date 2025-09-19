import { z } from 'zod';

export const DeletePackDtoSchema = z.object({
  id: z.string()
});

export type DeletePackDto = z.infer<typeof DeletePackDtoSchema>;
