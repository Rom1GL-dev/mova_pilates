import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  email: z.string(),
  password: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  role: z.enum(['ADMIN', 'USER']),
  tel: z.string().nullable().optional(),
  dob: z.date().nullable().optional(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
});

export type User = z.infer<typeof UserSchema>;
