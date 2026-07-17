import { z } from 'zod';

export const searchSchema = (t: (key: string) => string) =>
  z.object({
    query: z.string().min(1, { message: t('searchSchema') }),
  });
