import { useQuery } from '@tanstack/react-query';
import { userService } from '@/features/user/usecases/user.service.ts';

export const useListUserOrders = (userId: string) => {
  return useQuery({
    queryKey: ['user-orders', userId],
    queryFn: async () => userService.listUserOrders(userId)
  });
};
