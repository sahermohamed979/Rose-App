import { z } from 'zod';

export const emailSchema = z.object({
  email: z
    .string({ message: 'email is required' })
    .pipe(z.email('Please enter a valid email address')),
});
