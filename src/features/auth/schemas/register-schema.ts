import { z } from 'zod';

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(1, { message: 'usernameRequired' })
      .min(3, { message: 'usernameShort' }),
    email: z
      .string()
      .min(1, { message: 'emailRequired' })
      .refine((email) => email.includes('@') && email.includes('.'), {
        message: 'emailInvalid',
      }),
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

export const emailVerificationSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'emailRequired' })
    .refine((email) => email.includes('@') && email.includes('.'), {
      message: 'emailInvalid',
    }),
});
export const otpVerificationSchema = z.object({
  otp: z.string().min(6, { message: 'otpRequired' }),
});
