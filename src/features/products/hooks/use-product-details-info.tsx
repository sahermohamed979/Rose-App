import { useQuery } from '@tanstack/react-query';
import { getProductDetailsInfo } from '../apis/product-details-info.api';
import { ProductDetailsResponse } from '@/shared/lib/types/product-details';

export function useProductInfo(
  productId: string,
  initialData?: ProductDetailsResponse['product']
) {
  return useQuery({
    queryKey: ['product-info', productId],

    queryFn: async () => {
      const response = await getProductDetailsInfo(productId);
      if (!response.status) {
        throw new Error(response.message);
      }
      return response.payload.product;
    },

    enabled: !!productId,
    staleTime: 5 * 60 * 1000,
  });
}
