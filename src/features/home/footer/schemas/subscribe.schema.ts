import { z } from 'zod';

/**
 * Zod schema for newsletter subscription form validation.
 * Uses a strict regular expression to validate the email structure.
 */
export const subscribeSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Invalid email format'
    ),
});

export type SubscribeFormValues = z.infer<typeof subscribeSchema>;
