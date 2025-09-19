import { z } from 'zod';

export const DeleteSessionDtoSchema = z.object({
  id: z.string()
});

export type DeleteSessionDto = z.infer<typeof DeleteSessionDtoSchema>;
