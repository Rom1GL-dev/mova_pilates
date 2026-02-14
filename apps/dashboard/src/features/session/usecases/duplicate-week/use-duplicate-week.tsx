import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DuplicateWeekDto } from '@/features/session/usecases/duplicate-week/duplicate-week.dto.ts';
import { sessionService } from '@/features/session/usecases/session.service.ts';

export const useDuplicateWeek = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['session', 'duplicate-week'],
    mutationFn: async (payload: DuplicateWeekDto) =>
      sessionService.duplicateWeek(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['session'] });
    }
  });
};
