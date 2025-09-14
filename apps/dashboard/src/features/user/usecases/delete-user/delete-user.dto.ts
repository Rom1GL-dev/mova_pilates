import { z } from 'zod';

export const DeleteUserDtoSchema = z.object({
  id: z.string()
});

export type DeleteUserDto = z.infer<typeof DeleteUserDtoSchema>;
