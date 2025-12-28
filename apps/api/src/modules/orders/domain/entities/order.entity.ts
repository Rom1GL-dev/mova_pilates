import { z } from 'zod';

export const OrderSchema = z.object({
  id: z.string(),
  packName: z.string(),
  userFullName: z.string(),
  amount: z.number(),
  status: z.enum(['SUCCESS', 'FAILED']),
  createdAt: z.date(),
});

export type Order = z.infer<typeof OrderSchema>;
