import { useQuery } from '@tanstack/react-query';
import { packService } from '@/features/pack/usecases/pack.service.ts';

export const useGetPack = (id: string) => {
  return useQuery({
    queryKey: ['pack'],
    queryFn: async () => packService.getPack(id)
  });
};
