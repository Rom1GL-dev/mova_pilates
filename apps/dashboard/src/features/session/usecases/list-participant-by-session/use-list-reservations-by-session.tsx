import { useQuery } from '@tanstack/react-query';
import { sessionService } from '@/features/session/usecases/session.service.ts';

export const useListReservationsBySession = (sessionId: string) => {
  return useQuery({
    queryKey: ['reservations', sessionId],
    queryFn: async () => sessionService.listReservationBySession(sessionId)
  });
};
