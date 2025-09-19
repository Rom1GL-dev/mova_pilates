import { useQuery } from '@tanstack/react-query';
import { sessionService } from '@/features/session/usecases/session.service.ts';

export const useGetSession = (id: string) => {
  return useQuery({
    queryKey: ['session'],
    queryFn: async () => sessionService.getPack(id)
  });
};
