'use server';

import { HEADERS } from '@/shared/lib/constants/api.constants';
import { IProduct } from '../types/product-types';
import {
  ApiResponse,
  IPaginationResponse,
} from '@/shared/lib/types/api';

const DEFAULT_PRODUCTS_LIMIT = '12';
const DEFAULT_SORT_BY = 'bestSelling';
const DEFAULT_SORT_ORDER = 'desc';

// Applies default pagination and sorting when the caller didn't specify them
function buildProductsUrl(searchParams: string): string {
  const params = new URLSearchParams(searchParams);

  if (!params.has('limit')) {
    params.set('limit', DEFAULT_PRODUCTS_LIMIT);
  }

  // Skip default sorting when the user is actively searching
  if (!params.has('sortBy') && !params.has('search')) {
    params.set('sortBy', DEFAULT_SORT_BY);
    params.set('sortOrder', DEFAULT_SORT_ORDER);
  }

  return `${process.env.NEXT_API_URL}/products?${params.toString()}`;
}

export async function fetchProducts(
  searchParams: string
): Promise<IProduct> {
  const url = buildProductsUrl(searchParams);

  try {
    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    const data: IProduct = await response.json();
    return data;
  } catch {
    return [] as unknown as IProduct;
  }
}

export async function getProductAction(
  searchParamsPromise: PageProps<'/[locale]/products'>['searchParams']
) {
  const searchParams = await searchParamsPromise;
  const page = searchParams.page ?? '1';

  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/products?page=${page}`,
      {
        method: 'GET',
        headers: {
          ...HEADERS.jsonBody,
        },
      }
    );

    const data: ApiResponse<IPaginationResponse<IProduct>> =
      await response.json();
    if (!data.status) {
      return null;
    }

    return data.payload;
  } catch {
    return null;
  }
}
