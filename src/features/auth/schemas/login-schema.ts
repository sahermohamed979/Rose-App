import * as z from 'zod';

export const getLoginSchema = (t: (key: string) => string) =>
  z.object({
    username: z
      .string()
      .min(1, { message: t('required') })
      .email({ message: t('invalidEmail') }),
    password: z.string().min(1, { message: t('required') }),
    rememberMe: z.boolean().default(false).optional(),
  });

export type LoginFormData = z.infer<
  ReturnType<typeof getLoginSchema>
>;
