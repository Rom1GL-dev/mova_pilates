import { TUser } from '@/features/user/types/TUser.ts';

export interface TSessionParticipants extends TUser {
  reservationStatus: SessionParticipantReservationStatus;
  reservationId: string;
  sessionId?: string;
  isGuest?: boolean;
}

export enum SessionParticipantReservationStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  MISSING = 'MISSING',
  PRESENT = 'PRESENT'
}
