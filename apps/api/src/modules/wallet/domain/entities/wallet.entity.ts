import { z } from 'zod';

export const WalletSchema = z.object({
  id: z.string().optional(),
  userId: z.string(),
  typeCourseId: z.string(),
  balance: z.number().int().nonnegative(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type Wallet = z.infer<typeof WalletSchema>;
