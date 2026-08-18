'use server';

import { getAuthToken } from '@/shared/lib/actions/getToken';
import { revalidatePath } from 'next/cache';

export async function deleteProductAction(productId: string) {
  try {
    const token = await getAuthToken();
    console.log('token', token);

    const response = await fetch(
      `${process.env.NEXT_API_URL}/products/${productId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response);

    if (!response.ok) {
      return { success: false, message: 'Failed to delete product' };
    }

    revalidatePath('/dashboard/products');

    return { success: true, message: 'Product deleted successfully' };
  } catch (error) {
    console.error('Error deleting product:', error);
    return { success: false, message: 'Something went wrong!' };
  }
}
