import { z } from 'zod';

export enum AppType {
  MOBILE = 'MOBILE',
  ADMIN = 'ADMIN',
}

export enum LogType {
  ADD = 'ADD',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  REGISTER = 'REGISTER',
  PAYMENT = 'PAYMENT',
  PASSWORD_RESET = 'PASSWORD_RESET',
  RESERVATION = 'RESERVATION',
  CANCELLATION = 'CANCELLATION',
  OTHER = 'OTHER',
}

export const AppTypeZod = z.enum(
  Object.values(AppType) as [string, ...string[]],
);
export const LogTypeZod = z.enum(
  Object.values(LogType) as [string, ...string[]],
);

export const LogSchema = z.object({
  id: z.string(),
  appType: AppTypeZod,
  logType: LogTypeZod,
  userId: z.string(),
  fullName: z.string().optional(),
  message: z.string(),
  createdAt: z.date(),
});

export type Log = z.infer<typeof LogSchema>;
