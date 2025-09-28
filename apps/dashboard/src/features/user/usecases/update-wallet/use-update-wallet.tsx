import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '@/features/user/usecases/user.service.ts';
import { UpdateWalletForm } from '@/features/user/usecases/update-wallet/update-wallet.dto.ts';

export const useUpdateWallet = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['wallet', userId],
    mutationFn: async (payload: UpdateWalletForm) =>
      userService.updateWallet(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallets', userId] });
    }
  });
};
