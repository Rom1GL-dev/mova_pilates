import { useQuery } from '@tanstack/react-query';
import { userService } from '@/features/user/usecases/user.service.ts';

export const useGetUser = (id: string) => {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => userService.getUser(id)
  });
};
