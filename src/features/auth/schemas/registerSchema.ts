import { z } from 'zod';

export const registerSchema = z
  .object({
    firstName: z.string().min(1, { message: 'firstNameRequired' }),
    lastName: z.string().min(1, { message: 'lastNameRequired' }),
    email: z
      .string()
      .min(1, { message: 'emailRequired' })
      .email({ message: 'emailInvalid' }),
    phone: z.string().min(1, { message: 'phoneRequired' }),
    gender: z.enum(['male', 'female'], {
      errorMap: () => ({ message: 'genderRequired' }),
    }),
    password: z
      .string()
      .min(8, { message: 'passMin' })
      .regex(/[A-Z]/, { message: 'passUppercase' })
      .regex(/[0-9]/, { message: 'passNumber' })
      .regex(/[^A-Za-z0-9]/, { message: 'passSpecial' }),
    confirmPassword: z
      .string()
      .min(1, { message: 'confirmPassRequired' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'passMatch',
    path: ['confirmPassword'],
  });

// التعديل الصح هنا:
export type RegisterSchemaType = z.infer<typeof registerSchema>;
