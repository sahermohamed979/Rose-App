import { z } from 'zod';

export const profileSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'firstNameRequired' })
    .max(50, { message: 'firstNameTooLong' }),
  lastName: z
    .string()
    .min(1, { message: 'lastNameRequired' })
    .max(50, { message: 'lastNameTooLong' }),
  phone: z
    .string()
    .optional()
    .nullable()
    .refine(
      (val) => {
        if (!val || val.trim() === '') return true;
        return /^\+?[0-9\s-]{7,20}$/.test(val);
      },
      { message: 'phoneInvalid' }
    ),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
