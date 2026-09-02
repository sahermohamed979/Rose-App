import { z } from 'zod';

export const cartQuantitySchema = z.object({
  quantity: z.number().min(1),
});
