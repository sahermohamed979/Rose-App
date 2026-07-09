import { z } from 'zod';
export const resetPasswordSchema = (t: (key: string) => string) =>
  z
    .object({
      newPassword: z
        .string({ message: t('passwordSchema.passwordRequired') })
        .min(8, t('passwordSchema.passwordMinLength'))
        .regex(/[A-Z]/, t('passwordSchema.passwordUppercase'))
        .regex(/[a-z]/, t('passwordSchema.passwordLowercase'))
        .regex(/[0-9]/, t('passwordSchema.passwordNumber'))
        .regex(
          /[^A-Za-z0-9]/,
          t('passwordSchema.passwordSpecialCharacter')
        ),
      confirmPassword: z.string({
        message: t('passwordSchema.confirmPasswordRequired'),
      }),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: t('passwordSchema.passwordsDoNotMatch'),
      path: ['confirmPassword'],
    })
    .strict();
