import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateUserForm } from '@/features/user/usecases/update-user/update-user.dto.ts';
import { userService } from '@/features/user/usecases/user.service.ts';

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['user'],
    mutationFn: async (payload: UpdateUserForm) => userService.update(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    }
  });
};
