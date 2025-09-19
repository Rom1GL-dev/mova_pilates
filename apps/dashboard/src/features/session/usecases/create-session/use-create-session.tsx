import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateSessionForm } from '@/features/session/usecases/create-session/create-session.dto.ts';
import { sessionService } from '@/features/session/usecases/session.service.ts';

export const useCreateSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['session'],
    mutationFn: async (payload: CreateSessionForm) =>
      sessionService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['session'] });
    }
  });
};
