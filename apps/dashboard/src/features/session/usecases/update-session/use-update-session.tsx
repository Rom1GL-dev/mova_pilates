import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateSessionForm } from '@/features/session/usecases/update-session/update-session.dto.ts';
import { sessionService } from '@/features/session/usecases/session.service.ts';

export const useUpdateSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['session'],
    mutationFn: async (payload: UpdateSessionForm) =>
      sessionService.update(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['session'] });
    }
  });
};
