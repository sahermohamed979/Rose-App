'use server';

import { revalidatePath, updateTag } from 'next/cache';

import { getAuthToken } from '@/shared/lib/actions/getToken';
import { HEADERS } from '@/shared/lib/constants/api.constants';
import type { ApiResponse } from '@/shared/lib/types/api';
import { PRODUCTS_CACHE_TAG } from '../constants/product-cache';
import type { ProductActionResult } from '../types/product-action-result.types';

export async function deleteProductAction(
  productId: string
): Promise<ProductActionResult> {
  try {
    const token = await getAuthToken();
    if (!token?.accessToken) {
      return { success: false };
    }

    const response = await fetch(
      `${process.env.NEXT_API_URL}/products/${productId}`,
      {
        method: 'DELETE',
        headers: {
          ...HEADERS.jsonBody,
          ...HEADERS.authorization(token.accessToken),
        },
      }
    );
    const result: ApiResponse<unknown> = await response.json();

    if (!result.status) {
      return { success: false, message: result.message };
    }
    if (!response.ok) {
      return { success: false };
    }

    updateTag(PRODUCTS_CACHE_TAG);
    revalidatePath('/[locale]/dashboard/products', 'page');

    return { success: true };
  } catch {
    return { success: false };
  }
}
