import { useQuery } from '@tanstack/react-query';
import { sessionService } from '@/features/session/usecases/session.service.ts';

export const useListSession = () => {
  return useQuery({
    queryKey: ['session'],
    queryFn: async () => sessionService.listPacks()
  });
};
