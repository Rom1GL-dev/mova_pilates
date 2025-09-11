import { useQuery } from '@tanstack/react-query';
import { userService } from '@/features/users/usecases/user.service.ts';

export const useListUsers = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => userService.listUsers()
  });
};
