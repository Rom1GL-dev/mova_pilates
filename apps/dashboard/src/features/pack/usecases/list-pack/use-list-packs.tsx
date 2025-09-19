import { useQuery } from '@tanstack/react-query';
import { packService } from '@/features/pack/usecases/pack.service.ts';

export const useListPacks = () => {
  return useQuery({
    queryKey: ['pack'],
    queryFn: async () => packService.listPacks()
  });
};
