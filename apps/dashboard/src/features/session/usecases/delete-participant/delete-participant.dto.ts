import { z } from 'zod';

export const DeleteSessionDtoSchema = z.object({
  id: z.string()
});

export type DeleteParticipantDto = z.infer<typeof DeleteSessionDtoSchema>;
