import { useQuery } from '@tanstack/react-query';
import { analyticsService } from '@/features/dashboard/usecases/analytics.service.ts';

export const useGetAnalytics = () => {
  return useQuery({
    queryKey: ['analytics'],
    queryFn: async () => analyticsService.getAnalytics()
  });
};
