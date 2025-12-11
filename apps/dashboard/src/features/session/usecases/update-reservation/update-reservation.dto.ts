import { z } from 'zod';
import { SessionParticipantReservationStatus } from '@/features/session/types/TSessionParticipants.ts';

export const updateReservationForm = z.object({
  status: z.enum(SessionParticipantReservationStatus)
});

export const updateReservationDto = updateReservationForm.extend({
  id: z.string()
});

export type UpdateReservationForm = z.infer<typeof updateReservationForm>;
export type UpdateReservationDto = z.infer<typeof updateReservationDto>;
