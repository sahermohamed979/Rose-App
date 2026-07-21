'use server';
import type { ApiResponse } from '@/shared/lib/types/api';
import type {
  ProductPayload,
  ReviewsPayload,
} from '../types/product-types';

const BASE_URL = process.env.NEXT_API_URL;

// ─── Get Product by ID ────────────────────────────────────────────────────────

export async function getProductById(
  id: string
): Promise<ApiResponse<ProductPayload>> {
  try {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
      next: { revalidate: 60 },
    });

    const data = await res.json();

    if (!res.ok || !data.status) {
      return {
        status: false,
        message: data?.message || `Request failed (${res.status})`,
      };
    }

    return data as ApiResponse<ProductPayload>;
  } catch (error) {
    return {
      status: false,
      message:
        error instanceof Error ? error.message : 'Server unreachable',
    };
  }
}

// ─── Get Reviews (Paginated, filtered by productId or userId) ─────────────────

export interface GetProductReviewsParams {
  productId?: string;
  userId?: string;
  page?: number;
  limit?: number;
}

export async function getProductReviews({
  productId,
  userId,
  page = 1,
  limit = 20,
}: GetProductReviewsParams): Promise<ApiResponse<ReviewsPayload>> {
  const params = new URLSearchParams();
  if (page) params.append('page', String(page));
  if (limit) params.append('limit', String(limit));
  if (productId) params.append('productId', productId);
  if (userId) params.append('userId', userId);

  try {
    const res = await fetch(
      `${BASE_URL}/reviews?${params.toString()}`,
      {
        cache: 'no-store',
      }
    );

    const data = await res.json();

    if (!res.ok || !data.status) {
      return {
        status: false,
        message: data?.message || `Request failed (${res.status})`,
      };
    }

    return data as ApiResponse<ReviewsPayload>;
  } catch (error) {
    return {
      status: false,
      message:
        error instanceof Error ? error.message : 'Server unreachable',
    };
  }
}
