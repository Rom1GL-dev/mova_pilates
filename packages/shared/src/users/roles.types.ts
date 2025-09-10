import z from 'zod';

export const ROLES = ['ADMIN', 'USER'] as const;

export const Role = z.enum(ROLES);
export type Role = (typeof ROLES)[number];
