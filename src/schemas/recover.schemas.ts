import { z } from 'zod';

export const findUserSchema = z.object({
  email: z.string().email('Invalid email address'),
});
