import { z } from 'zod';

export const couponSchema = (t: (key: string) => string) =>
  z.object({
    code: z
      .string()
      .min(1, t('errors.couponCodeRequired'))
      .max(200, t('errors.couponCodeTooLong'))
      .transform((v) => v.trim()),
  });

export type CouponFormValues = z.input<ReturnType<typeof couponSchema>>;
