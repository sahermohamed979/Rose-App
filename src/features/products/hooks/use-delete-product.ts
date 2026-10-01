'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { useRouter } from '@/i18n/navigation';
import { PRODUCT_QUERY_KEYS } from '@/shared/lib/constants/product-query-keys.constants';
import { deleteProductAction } from '../actions/delete-product.action';
import { ProductActionError } from '../lib/product-action-error';

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const t = useTranslations('products');

  return useMutation({
    mutationFn: async (productId: string) => {
      const result = await deleteProductAction(productId);
      if (!result.success) {
        throw new ProductActionError(result.message);
      }
      return result;
    },
    onSuccess: async (_data, productId) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: PRODUCT_QUERY_KEYS.suggested,
        }),
        queryClient.invalidateQueries({
          queryKey: PRODUCT_QUERY_KEYS.searchAll,
        }),
        queryClient.invalidateQueries({
          queryKey: PRODUCT_QUERY_KEYS.details(productId),
        }),
      ]);
      router.refresh();
      toast.success(t('deleteSuccess'));
    },
    onError: (error) => {
      const isExpectedError =
        error instanceof ProductActionError && error.message;

      toast.error(isExpectedError ? error.message : t('deleteError'));
    },
  });
}
