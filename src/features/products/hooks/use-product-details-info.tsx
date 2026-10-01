import { useQuery } from '@tanstack/react-query';
import { getProductDetailsInfo } from '../apis/product-details-info.api';
import { ProductDetailsResponse } from '../../../shared/lib/types/product-types';
import { PRODUCT_QUERY_KEYS } from '@/shared/lib/constants/product-query-keys.constants';

export function useProductInfo(
  productId: string,
  initialData?: ProductDetailsResponse['product']
) {
  return useQuery({
    queryKey: PRODUCT_QUERY_KEYS.details(productId),

    queryFn: async () => {
      const response = await getProductDetailsInfo(productId);

      if (!response.status) {
        throw new Error(response.message);
      }

      return response.payload.product;
    },

    initialData,

    enabled: !!productId,
    staleTime: 5 * 60 * 1000,
  });
}
