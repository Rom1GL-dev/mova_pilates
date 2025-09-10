import { env } from '@/env';

export type AppConfig = {
  name: string;
  logo: string;
  apiUrl: string;
};
export const appConfig: AppConfig = {
  name: 'Mova Pilates',
  logo: '/logo.png',
  apiUrl: env.API_URL,
};
