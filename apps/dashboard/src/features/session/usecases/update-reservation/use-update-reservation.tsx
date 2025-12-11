import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sessionService } from '@/features/session/usecases/session.service.ts';
import { UpdateReservationDto } from '@/features/session/usecases/update-reservation/update-reservation.dto.ts';

export const useUpdateReservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['reservations'],
    mutationFn: async (payload: UpdateReservationDto) =>
      sessionService.updateReservation(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    }
  });
};
