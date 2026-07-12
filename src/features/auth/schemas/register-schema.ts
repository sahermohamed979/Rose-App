import { z } from 'zod';

export const registerSchema = (t: (key: string) => string) =>
  z
    .object({
      username: z
        .string()
        .min(1, { message: t('errors.usernameRequired') })
        .min(3, { message: t('errors.usernameShort') }),
      email: z
        .string()
        .min(1, { message: t('errors.verifyEmailRequired') })
        .refine(
          (email) => email.includes('@') && email.includes('.'),
          {
            message: t('errors.emailInvalid'),
          }
        ),
      password: z
        .string()
        .min(8, { message: t('errors.passPolicy') })
        .refine(
          (val) =>
            /[A-Z]/.test(val) &&
            /[0-9]/.test(val) &&
            /[^A-Za-z0-9]/.test(val),
          {
            message: t('errors.passPolicy'),
          }
        ),
      confirmPassword: z
        .string()
        .min(1, { message: t('errors.passMatch') }),
      firstName: z
        .string()
        .min(1, { message: t('errors.firstNameRequired') }),
      lastName: z
        .string()
        .min(1, { message: t('errors.lastNameRequired') }),
      gender: z.enum(['MALE', 'FEMALE'], {
        error: () => ({
          message: t('errors.genderRequired'),
        }),
      }),
      phone: z
        .string()
        .min(1, { message: t('errors.phoneRequired') }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('errors.passMatch'),
      path: ['confirmPassword'],
    });

export const otpVerificationSchema = (t: (key: string) => string) =>
  z.object({
    code: z.string().min(6, { message: t('otp.invalid') }),
  });
