import { z } from 'zod';

export const createUserForm = z.object({
  firstname: z.string().min(1, 'Prénom est requis'),
  lastname: z.string().min(1, 'Nom est requis'),
  email: z.string(),
  tel: z.string(),
  dob: z.date(),
  password: z
    .string()
    .min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
  role: z.enum(['ADMIN', 'USER'])
});

export const createUserDto = createUserForm.extend({
  id: z.string()
});

export type CreateUserForm = z.infer<typeof createUserForm>;
export type CreateUserDto = z.infer<typeof createUserDto>;
