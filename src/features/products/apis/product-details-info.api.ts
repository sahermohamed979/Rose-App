import { ApiResponse } from '@/shared/lib/types/api';
import { ProductDetailsResponse } from '@/shared/lib/types/product-types';

export const getProductDetailsInfo = async (
  productId: string
): Promise<ApiResponse<ProductDetailsResponse>> => {
  const response = await fetch(
    `${process.env.NEXT_API_URL}/products/${productId}`
  );

  const data = await response.json();

  if (!response.ok) {
    return {
      status: false,
      message: data.message,
      code: response.status,
    };
  }

  return data;
};
