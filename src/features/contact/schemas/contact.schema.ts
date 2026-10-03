import { z } from 'zod';

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(100),
  email: z
    .string()
    .email({ message: 'Please enter a valid email address' }),
  phone: z.string().optional(),
  subject: z
    .string()
    .min(1, { message: 'Please select an inquiry topic' }),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters' })
    .max(2000),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
