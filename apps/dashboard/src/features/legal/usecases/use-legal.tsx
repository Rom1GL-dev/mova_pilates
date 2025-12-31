import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api.ts';

export function useLegal(type: string) {
  return useQuery({
    queryKey: ['legal', type],
    queryFn: async () => {
      const res = await api.get(`/v1/backoffice/legals/${type}`);
      return res.data;
    }
  });
}
