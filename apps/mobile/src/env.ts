import { z } from "zod";

const EnvSchema = z.object({
    API_URL: z.string(),
});

export const env = EnvSchema.parse({
    API_URL: process.env.API_URL,
});
