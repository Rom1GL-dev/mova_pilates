import { z } from 'zod';

export const ReservationSchema = z.object({
  id: z.string(),
  userId: z.string(),
  sessionId: z.string(),
  status: z.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'MISSING', 'PRESENT']),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
});

export type Reservation = z.infer<typeof ReservationSchema>;
