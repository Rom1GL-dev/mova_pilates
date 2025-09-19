import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreatePackForm } from '@/features/pack/usecases/create-pack/create-pack.dto.ts';
import { packService } from '@/features/pack/usecases/pack.service.ts';

export const useCreatePack = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['pack'],
    mutationFn: async (payload: CreatePackForm) => packService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pack'] });
    }
  });
};
