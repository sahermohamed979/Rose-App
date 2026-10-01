'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { useRouter } from '@/i18n/navigation';
import { PRODUCT_QUERY_KEYS } from '@/shared/lib/constants/product-query-keys.constants';
import { editProductAction } from '../actions/edit-product.action';
import { createProductFormData } from '../lib/create-product-form-data';
import { ProductActionError } from '../lib/product-action-error';
import type { EditProductFormValues } from '../schemas/edit-product-schema';
export function useEditProduct(
  productId: string,
  existingGallery: string[]
) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const t = useTranslations('dashboard.products');

  return useMutation({
    mutationFn: async (values: EditProductFormValues) => {
      const result = await editProductAction(
        productId,
        createProductFormData(values),
        existingGallery
      );
      if (!result.success) {
        throw new ProductActionError(result.message);
      }
      return result;
    },
    onSuccess: async () => {
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

      toast.success(t('editSuccess'));
      router.push('/dashboard/products');
    },
    onError: (error) => {
      const isExpectedError =
        error instanceof ProductActionError && error.message;

      toast.error(isExpectedError ? error.message : t('editError'));
    },
  });
}
