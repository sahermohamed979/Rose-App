import { z } from 'zod';

export const registerSchema = (t: (key: string) => string) =>
  z
    .object({
      username: z
        .string()
        .min(1, { message: t('register.errors.usernameRequired') })
        .min(3, { message: t('register.errors.usernameShort') }),
      email: z
        .string()
        .min(1, { message: t('register.errors.emailRequired') })
        .refine(
          (email) => email.includes('@') && email.includes('.'),
          {
            message: t('register.errors.emailInvalid'),
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
            message: t('register.errors.passPolicy'),
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

export const otpVerificationSchema = (t: (key: string) => string) =>
  z.object({
    code: z.string().min(6, { message: t('register.otp.oInvalid') }),
  });
