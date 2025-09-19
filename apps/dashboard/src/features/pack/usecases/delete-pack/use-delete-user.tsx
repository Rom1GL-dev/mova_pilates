import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeletePackDto } from '@/features/pack/usecases/delete-pack/delete-pack.dto.ts';
import { packService } from '@/features/pack/usecases/pack.service.ts';

export const useDeletePack = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['pack'],
    mutationFn: async (payload: DeletePackDto) =>
      packService.deletePack(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pack'] });
    }
  });
};
