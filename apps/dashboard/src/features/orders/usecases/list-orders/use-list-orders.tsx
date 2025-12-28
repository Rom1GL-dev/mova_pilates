import { useQuery } from '@tanstack/react-query';
import { orderService } from '@/features/orders/usecases/order.service.ts';

export const useListOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: async () => orderService.listOrders()
  });
};
