import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeleteUserDto } from '@/features/user/usecases/delete-user/delete-user.dto.ts';
import { userService } from '@/features/user/usecases/user.service.ts';

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
