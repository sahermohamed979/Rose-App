import { z } from 'zod';

export const occasionSchema = z.object({
  title: z.string().trim().min(1, 'titleError'),
  description: z.string().trim().min(1, 'descriptionError'),
  image: z.string().min(1, 'imageError'),
});

export type OccasionFormValues = z.infer<typeof occasionSchema>;
