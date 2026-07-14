import { z } from 'zod';

export const forgotPasswordEmailSchema = (
  t: (key: string) => string
) =>
  z.object({
    email: z
      .string({ message: t('step1.emailRequired') })
      .pipe(z.email(t('step1.validEmail'))),
    redirectUrl: z.url().optional(),
  });
