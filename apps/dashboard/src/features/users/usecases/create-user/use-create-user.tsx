import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateUserForm } from '@/features/users/usecases/create-user/create-user.dto.ts';
import { userService } from '@/features/users/usecases/user.service.ts';

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['user'],
    mutationFn: async (payload: CreateUserForm) => userService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    }
  });
};
