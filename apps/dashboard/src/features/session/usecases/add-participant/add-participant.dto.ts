import { z } from 'zod';

export const addParticipantDto = z.object({
  userId: z.string(),
  sessionId: z.string()
});
export type AddParticipantDto = z.infer<typeof addParticipantDto>;
