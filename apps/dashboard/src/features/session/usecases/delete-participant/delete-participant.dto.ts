import { z } from 'zod';

export const DeleteSessionDtoSchema = z.object({
  id: z.string(),
  sessionId: z.string().optional(),
  isGuest: z.boolean().optional()
});

export type DeleteParticipantDto = z.infer<typeof DeleteSessionDtoSchema>;
