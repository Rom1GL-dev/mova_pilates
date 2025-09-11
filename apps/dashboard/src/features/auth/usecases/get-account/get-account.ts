import { api } from '@/lib/api';

const BASE_URL = '/v1/auth/discord';

export const getAccount = async () => {
  const response = await api.get(`${BASE_URL}/me`);

  return response.data;
};
