import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sessionService } from '@/features/session/usecases/session.service.ts';
import { DeleteParticipantDto } from '@/features/session/usecases/delete-participant/delete-participant.dto.ts';

export const useDeleteParticipant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['reservations'],
    mutationFn: async (payload: DeleteParticipantDto) =>
      sessionService.deleteParticipant(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    }
  });
};
