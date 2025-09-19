import { useMutation, useQueryClient } from '@tanstack/react-query';
import { packService } from '@/features/pack/usecases/pack.service.ts';
import { UpdatePackForm } from '@/features/pack/usecases/update-pack/update-pack.dto.ts';

export const useUpdatePack = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['pack'],
    mutationFn: async (payload: UpdatePackForm) => packService.update(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pack'] });
    }
  });
};
