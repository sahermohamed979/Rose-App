import { z } from 'zod';

export const couponSchema = z.object({
  code: z
    .string()
    .min(1, 'Coupon code is required')
    .refine(
      (v) => {
        const num = parseFloat(v.replace('%', '').trim());
        return !isNaN(num) && num > 0 && num <= 100;
      },
      { message: 'Enter a valid percentage between 1 and 100' }
    ),
});

export type CouponFormValues = z.input<typeof couponSchema>;
