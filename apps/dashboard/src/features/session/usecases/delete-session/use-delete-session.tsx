import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeleteSessionDto } from '@/features/session/usecases/delete-session/delete-session.dto.ts';
import { sessionService } from '@/features/session/usecases/session.service.ts';

export const useDeleteSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['session'],
    mutationFn: async (payload: DeleteSessionDto) =>
      sessionService.deletePack(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['session'] });
    }
  });
};
