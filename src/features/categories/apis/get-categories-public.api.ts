import {
  ApiResponse,
  IPaginationResponse,
} from '@/shared/lib/types/api';
import { ProductCategory } from '@/shared/lib/types/product-types';

export interface GetCategoriesPublicParams {
  page?: number;
  limit?: number;
  search?: string;
}

export async function getCategoriesPublic(
  params: GetCategoriesPublicParams = {}
): Promise<ApiResponse<IPaginationResponse<ProductCategory>>> {
  try {
    const searchParams = new URLSearchParams();
    if (params.page) {
      searchParams.set('page', String(params.page));
    }
    if (params.limit) {
      searchParams.set('limit', String(params.limit));
    }
    if (params.search) {
      searchParams.set('search', params.search);
    }

    const res = await fetch(
      `${process.env.NEXT_API_URL}/categories?${searchParams.toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      return {
        status: false,
        message: 'Failed to fetch categories',
      };
    }

    const data: ApiResponse<IPaginationResponse<ProductCategory>> =
      await res.json();
    return data;
  } catch (error: unknown) {
    return {
      status: false,
      message:
        error instanceof Error
          ? error.message
          : 'Something went wrong while fetching categories',
    };
  }
}
