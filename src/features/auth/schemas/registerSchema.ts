import { z } from 'zod';

export const createRegisterSchema = (t: any) =>
  z
    .object({
      firstName: z
        .string()
        .min(1, { message: t('errors.firstNameRequired') }),
      lastName: z
        .string()
        .min(1, { message: t('errors.lastNameRequired') }),
      email: z
        .string()
        .min(1, { message: t('errors.emailRequired') })
        .email({ message: t('errors.emailInvalid') }),
      phone: z
        .string()
        .min(1, { message: t('errors.phoneRequired') }),
      gender: z.enum(['male', 'female'], {
        errorMap: (issue) => {
          return { message: 'genderRequired' };
        },
      }),
      password: z
        .string()
        .min(8, { message: t('errors.passMin') })
        .regex(/[A-Z]/, { message: t('errors.passUppercase') })
        .regex(/[0-9]/, { message: t('errors.passNumber') })
        .regex(/[^A-Za-z0-9]/, { message: t('errors.passSpecial') }),
      confirmPassword: z
        .string()
        .min(1, { message: t('errors.confirmPassRequired') }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('errors.passMatch'),
      path: ['confirmPassword'],
    });

export type RegisterSchemaType = z.infer<
  ReturnType<typeof createRegisterSchema>
>;
