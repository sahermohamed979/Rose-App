'use server';

import { ProductsResponse } from '../types/product-types';

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
): Promise<ProductsResponse> {
  const url = buildProductsUrl(searchParams);

  try {
    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    const data: ProductsResponse = await response.json();
    return data;
  } catch {
    return {
      status: false,
      code: 500,
      payload: { data: [], metadata: { totalPages: 1 } },
    };
  }
}
