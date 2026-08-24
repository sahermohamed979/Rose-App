import { parsePhoneNumber } from 'react-phone-number-input';
import { z } from 'zod';

export const profileFormSchema = (t: (key: string) => string) =>
  z.object({
    firstName: z
      .string()
      .min(1, { message: t('errors.firstNameRequired') }),
    lastName: z
      .string()
      .min(1, { message: t('errors.lastNameRequired') }),
    phone: z
      .string()
      .optional()
      .refine((val) => !val || /^\+20(10|11|12|15)\d{8}$/.test(val), {
        message: t('errors.phoneInvalid'),
      }),
    email: z.string(),
    gender: z.string(),
    photo: z.string().optional(),
  });

export type UserProfileFormValues = z.infer<
  ReturnType<typeof profileFormSchema>
>;
