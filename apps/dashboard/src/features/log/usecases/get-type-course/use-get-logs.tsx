import { useQuery } from '@tanstack/react-query';
import { logsService } from '@/features/log/usecases/logs.service.ts';

export const useGetLogs = (id: string) => {
  return useQuery({
    queryKey: ['logs'],
    queryFn: async () => logsService.getLogs(id)
  });
};
