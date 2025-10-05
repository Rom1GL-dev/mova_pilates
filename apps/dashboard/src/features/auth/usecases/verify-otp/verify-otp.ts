import { api } from '@/lib/api';
import { z } from 'zod/v4';

const BASE_URL = '/v1/backoffice/auth';

export const OtpSchema = z.object({
  email: z.string(),
  otp: z.string()
});

export type OtpSchema = z.infer<typeof OtpSchema>;

export const verifyOtp = async (data: OtpSchema) => {
  const res = await api.post(`${BASE_URL}/verify-otp`, data, {
    withCredentials: true
  });

  return res.data;
};
