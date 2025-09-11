import { api } from '@/lib/api.ts';

const BASE_URL = '/v1/auth';

export const logout = async () => {
  await api.post(`${BASE_URL}/logout`);
};
