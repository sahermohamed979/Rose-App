import { HEADERS } from '@/shared/lib/constants/api.constants';
import { IProduct } from '../../../shared/lib/types/product-types';
import { getLocale } from 'next-intl/server';

import {
  ApiResponse,
  IPaginationResponse,
} from '@/shared/lib/types/api';
import { ProductsSearchParams } from '../../../shared/lib/types/product-types';
import { DEFAULT_PRODUCTS_LIMIT } from '../constants/products-constant';

export async function getProductAction(
  searchParams: ProductsSearchParams
): Promise<IPaginationResponse<IProduct> | null> {
  const locale = await getLocale();

  const params = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (value === undefined || value === '') {
      return;
    }
    params.set(key, Array.isArray(value) ? value[0] : value);
  });

  if (!params.has('page')) {
    params.set('page', '1');
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/products?limit=${DEFAULT_PRODUCTS_LIMIT}&${params.toString()}`,
      {
        method: 'GET',
        headers: {
          ...HEADERS.jsonBody,
          'Accept-Language': locale,
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
