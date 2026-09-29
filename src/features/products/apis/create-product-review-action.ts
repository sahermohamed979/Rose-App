'use server';

import { z } from 'zod';
import {
  IProductReviewError,
  IProductReviewresponse,
} from '@/features/products/types/create-product-review';
import { getDirectToken } from '@/shared/lib/actions/get-direct-token';

const reviewSchema = z.object({
  productId: z.string(),
  headline: z.string().min(5).max(32),
  content: z.string().min(20).max(100),
  rating: z.number().min(1).max(5),
});

export async function createProductReviewAction(
  reviewData: ReviewData
) {
  const parsed = reviewSchema.safeParse(reviewData);

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0].message);
  }

  const token = await getDirectToken();

  const response = await fetch(
    `${process.env.NEXT_API_URL}/reviews`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parsed.data),
    }
  );

  const data: IProductReviewresponse = await response.json();

  if (!response.ok) {
    const errorData = data as IProductReviewError;
    throw new Error(errorData.message || 'Something went wrong');
  }

  return data;
}
