import type { ApiResponse } from '@/shared/lib/types/api';
import type {
  IProduct,
  ProductPayload,
} from '@/shared/lib/types/product-types';
import { getLocale } from 'next-intl/server';

const BASE_URL =
  process.env.NEXT_API_URL || process.env.NEXT_PUBLIC_API_URL;

export async function getSuggestedProductsAction(
  limit = 8
): Promise<IProduct[]> {
  try {
    const locale = await getLocale();

    const params = new URLSearchParams({
      limit: String(limit),
      sortBy: 'mostPopular',
      sortOrder: 'desc',
    });

    const res = await fetch(
      `${BASE_URL}/products?${params.toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': locale,
        },
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    );

    const data = await res.json();

    if (!res.ok || !data.status) {
      return [];
    }

    const payload = data as ApiResponse<ProductPayload>;
    if (payload.status) {
      return (
        payload.payload?.products ??
        (data?.payload?.data as IProduct[]) ??
        []
      );
    }

    return [];
  } catch {
    return [];
  }
}
