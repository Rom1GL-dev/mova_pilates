import { useQuery } from '@tanstack/react-query';
import { userService } from '@/features/user/usecases/user.service.ts';

export const useListUserReservations = (userId: string) => {
  return useQuery({
    queryKey: ['user-reservations', userId],
    queryFn: async () => userService.listUserReservation(userId)
  });
};
