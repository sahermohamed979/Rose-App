import { z } from 'zod';

export const emailSchema = (t: (key: string) => string) =>
  z.object({
    email: z
      .string({ message: t('step1.emailRequired') })
      .pipe(z.email(t('step1.validEmail'))),
  });
