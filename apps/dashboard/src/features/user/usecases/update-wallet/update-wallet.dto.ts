import { z } from 'zod';

export const updateWalletForm = z.object({
  userId: z.string(),
  typeCourseId: z.string(),
  balance: z.number().nonnegative()
});

export type UpdateWalletForm = z.infer<typeof updateWalletForm>;
