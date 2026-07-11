import { z } from 'zod';
import { useTranslations } from 'next-intl';

export const registerSchema = (t: (key: string) => string) =>
  z
    .object({
      username: z
        .string()
        .min(1, { message: 'usernameRequired' })
        .min(3, { message: 'usernameShort' }),
      email: z
        .string()
        .min(1, { message: t('errors.emailRequired') })
        .refine(
          (email) => email.includes('@') && email.includes('.'),
          {
            message: t('errors.emailInvalid'),
          }
        ),
      password: z
        .string()
        .min(8, { message: 'passPolicy' })
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
        .min(1, { message: 'confirmPassRequired' }),
      firstName: z.string().min(1, { message: 'firstNameRequired' }),
      lastName: z.string().min(1, { message: 'lastNameRequired' }),
      gender: z.enum(['MALE', 'FEMALE'], {
        error: () => ({ message: 'genderRequired' }),
      }),
      phone: z.string().min(1, { message: 'phoneRequired' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'passMatch',
      path: ['confirmPassword'],
    });

// export const emailVerificationSchema = (t:(key:string)=>string)=>
//   z.object({
//   email: z
//     .string()
//     .min(1, { message: t('errors.emailRequired') })
//     .refine((email) => email.includes('@') && email.includes('.'), {
//       message: t('errors.emailInvalid'),
//     }),
// });
export const otpVerificationSchema = (t: (key: string) => string) =>
  z.object({
    code: z.string().min(6, { message: t('otp.invalid') }),
  });
