import * as z from 'zod';

export const getChangePasswordSchema = (t: (key: any) => string) => {
  return z
    .object({
      currentPassword: z
        .string()
        .min(1, { message: t('errors.oldPasswordRequired') }),

      newPassword: z
        .string()
        .min(8, { message: t('errors.newPasswordMin') })
        .regex(/[A-Z]/, {
          message: t('errors.newPasswordUppercase'),
        })
        .regex(/[a-z]/, {
          message: t('errors.newPasswordLowercase'),
        })
        .regex(/[0-9]/, {
          message: t('errors.newPasswordNumber'),
        })
        .regex(/[^A-Za-z0-9]/, {
          message: t('errors.newPasswordSpecial'),
        }),

      confirmPassword: z
        .string()
        .min(1, { message: t('errors.confirmRequired') }),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: t('errors.mismatch'),
      path: ['confirmPassword'],
    });
};

export type ChangePasswordValues = z.infer<
  ReturnType<typeof getChangePasswordSchema>
>;
