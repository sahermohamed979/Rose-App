import { z } from 'zod';

export const categorySchema = z.object({
  title: z.string().trim().min(1, 'titleError'),
  image: z.string().min(1, 'imageError'),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
