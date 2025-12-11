import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sessionService } from '@/features/session/usecases/session.service.ts';
import { AddParticipantDto } from '@/features/session/usecases/add-participant/add-participant.dto.ts';

export const useAddParticipant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['reservations'],
    mutationFn: async (payload: AddParticipantDto) =>
      sessionService.addParticipant(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    }
  });
};
