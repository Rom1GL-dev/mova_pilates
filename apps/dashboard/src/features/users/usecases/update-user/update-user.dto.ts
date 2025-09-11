import { z } from 'zod';

export const updateUserForm = z.object({
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  email: z.string().optional(),
  tel: z.string(),
  dob: z.date(),
  role: z.enum(['ADMIN', 'USER']).optional()
});

export const updateUserDto = updateUserForm.extend({
  id: z.string()
});

export type UpdateUserForm = z.infer<typeof updateUserForm>;
export type UpdateUserDto = z.infer<typeof updateUserDto>;
