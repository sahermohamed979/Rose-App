import { z } from 'zod';

export const registerSchema = (t: (key: string) => string) =>
  z
    .object({
      username: z
        .string()
        .min(1, { message: t('register.errors.usernameRequired') })
        .min(3, { message: 'usernameShort' }),
      email: z
        .string()
        .min(1, { message: t('register.errors.verifyEmailRequired') })
        .refine(
          (email) => email.includes('@') && email.includes('.'),
          {
            message: 'emailInvalid',
          }
        ),
      password: z
        .string()
        .min(8, { message: t('register.errors.passPolicy') })
        .refine(
          (val) =>
            /[A-Z]/.test(val) &&
            /[0-9]/.test(val) &&
            /[^A-Za-z0-9]/.test(val),
          {
            message: 'passPolicy',
          }
        ),
      confirmPassword: z
        .string()
        .min(1, { message: t('register.errors.passMatch') }),
      firstName: z
        .string()
        .min(1, { message: t('register.errors.firstNameRequired') }),
      lastName: z
        .string()
        .min(1, { message: t('register.errors.lastNameRequired') }),
      gender: z.enum(['MALE', 'FEMALE'], {
        error: () => ({
          message: t('register.errors.genderRequired'),
        }),
      }),
      phone: z
        .string()
        .min(1, { message: t('register.errors.phoneRequired') }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('register.errors.passMatch'),
      path: ['confirmPassword'],
    });

export const emailVerificationSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'verifyEmailRequired' })
    .refine((email) => email.includes('@') && email.includes('.'), {
      message: 'emailInvalid',
    }),
});
export const otpVerificationSchema = z.object({
  otp: z.string().min(6, { message: 'otpRequired' }),
});
