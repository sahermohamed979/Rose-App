import { z } from 'zod';

export const couponSchema = z.object({
  code: z
    .string()
    .min(1, 'Coupon code is required')
    .max(200, 'Coupon code is too long')
    .transform((v) => v.trim()),
});

export type CouponFormValues = z.input<typeof couponSchema>;
