import { useQuery } from '@tanstack/react-query';
import { getProductReviews } from '../apis/product-reviews.actions';
import type { ReviewsPayload } from '../types/product-types';

export const productReviewsKeys = {
  all: ['product-reviews'] as const,
  byProduct: (productId: string, page?: number, limit?: number) =>
    [...productReviewsKeys.all, productId, { page, limit }] as const,
};

interface UseProductReviewsOptions {
  productId: string;
  page?: number;
  limit?: number;
  enabled?: boolean;
}

export function useProductReviews({
  productId,
  page = 1,
  limit = 20,
  enabled = true,
}: UseProductReviewsOptions) {
  return useQuery({
    queryKey: productReviewsKeys.byProduct(productId, page, limit),
    queryFn: async () => {
      const response = await getProductReviews({
        productId,
        page,
        limit,
      });

      if (!response.status) {
        throw new Error(
          response.message ?? 'Failed to fetch reviews'
        );
      }

      // TypeScript narrowing – at this point response.status is true
      return (response as Extract<typeof response, { status: true }>)
        .payload as ReviewsPayload;
    },
    enabled: enabled && Boolean(productId),
    staleTime: 30_000,
  });
}
