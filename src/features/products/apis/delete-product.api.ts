'use server';

import { getAuthToken } from '@/shared/lib/actions/getToken';
import { revalidatePath } from 'next/cache';

export async function deleteProductAction(productId: string) {
  try {
    const token = await getAuthToken();

    if (!token?.accessToken) {
      return { success: false, message: 'Unauthorized' };
    }

    const response = await fetch(
      `${process.env.NEXT_API_URL}/products/${productId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.accessToken}`,
        },
      }
    );

    if (!response.ok) {
      return { success: false, message: 'Failed to delete product' };
    }

    revalidatePath('/[locale]/dashboard/products', 'page');

    return { success: true, message: 'Product deleted successfully' };
  } catch {
    return { success: false, message: 'Something went wrong!' };
  }
}
