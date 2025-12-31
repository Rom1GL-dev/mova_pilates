import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api.ts';

export function useUpdateLegal() {
  return useMutation({
    mutationFn: async (payload: { type: string; content: string }) => {
      return api.post('/v1/backoffice/legals', payload);
    }
  });
}
