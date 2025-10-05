import { api } from '@/lib/api';
import { z } from 'zod/v4';

const BASE_URL = '/v1/backoffice/auth/admin';

export const LoginInputSchema = z.object({
  email: z.string(),
  password: z.string()
});

export type LoginInput = z.infer<typeof LoginInputSchema>;

export const login = async (data: LoginInput) => {
  const res = await api.post(`${BASE_URL}/login`, data);

  return res.data;
};
