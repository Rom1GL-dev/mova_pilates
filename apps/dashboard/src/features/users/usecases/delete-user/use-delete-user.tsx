import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeleteUserDto } from '@/features/users/usecases/delete-user/delete-user.dto.ts';
import { userService } from '@/features/users/usecases/user.service.ts';

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['user'],
    mutationFn: async (payload: DeleteUserDto) =>
      userService.deleteUser(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    }
  });
};
