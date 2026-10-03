import {
  ApiResponse,
  IPaginationResponse,
} from '@/shared/lib/types/api';
import { OccasionType } from '@/shared/lib/types/product-types';

export interface GetOccasionsPublicParams {
  page?: number;
  limit?: number;
  search?: string;
}

export async function getOccasionsPublic(
  params: GetOccasionsPublicParams = {}
): Promise<ApiResponse<IPaginationResponse<OccasionType>>> {
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
      `${process.env.NEXT_API_URL}/occasions?${searchParams.toString()}`,
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
        message: 'Failed to fetch occasions',
      };
    }

    const data: ApiResponse<IPaginationResponse<OccasionType>> =
      await res.json();
    return data;
  } catch (error: unknown) {
    return {
      status: false,
      message:
        error instanceof Error
          ? error.message
          : 'Something went wrong while fetching occasions',
    };
  }
}
