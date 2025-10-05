import { z } from 'zod';

export const AnalyticsSchema = z.object({
  totalUsers: z.number(),
  newUsersThisMonth: z.number(),
});

export type Analytics = z.infer<typeof AnalyticsSchema>;
