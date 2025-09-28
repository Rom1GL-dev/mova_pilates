import { useQuery } from '@tanstack/react-query';
import { userService } from '@/features/user/usecases/user.service.ts';

export const useListAllWalletsByUser = (id: string) => {
  return useQuery({
    queryKey: ['wallets', id],
    queryFn: async () => userService.listAllWalletsByUser(id)
  });
};
