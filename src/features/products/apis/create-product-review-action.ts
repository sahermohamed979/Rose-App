'use server';

import {
  IProductReviewError,
  IProductReviewresponse,
} from '@/features/products/types/create-product-review';
import { getDirectToken } from '@/shared/lib/actions/get-direct-token';

export async function CreateProductReviewAction(
  reviewData: ReviewData
) {
  const token = await getDirectToken();

  const response = await fetch(
    `${process.env.NEXT_API_URL}/reviews`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    }
  );

  const data: IProductReviewresponse = await response.json();

  if (!response.ok) {
    const errorData = data as IProductReviewError;
    throw new Error(errorData.message || 'Something went wrong');
  }

  return data;
}
