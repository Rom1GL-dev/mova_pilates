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
  PAYMENT = 'PAYMENT',
  PASSWORD_RESET = 'PASSWORD_RESET',
  RESERVATION = 'RESERVATION',
  CANCELLATION = 'CANCELLATION',
  OTHER = 'OTHER',
}

export const LogSchema = z.object({
  id: z.string(),
  appType: z.enum(AppType),
  logType: z.enum(LogType),
  userId: z.string(),
  message: z.string(),
  createdAt: z.date(),
});

export type Log = z.infer<typeof LogSchema>;
