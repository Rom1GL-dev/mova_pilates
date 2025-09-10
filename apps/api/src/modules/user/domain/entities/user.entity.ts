import { z } from 'zod';
import { Role } from '@mova_pilates/shared';

export const UserSchema = z.object({
  id: z.string(),
  email: z.string(),
  password: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  role: Role,
  tel: z.string().nullable().optional(),
  dob: z.date().nullable().optional(),
  credit: z.number().min(0).default(0).nullable().optional(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
});

export type User = z.infer<typeof UserSchema>;
