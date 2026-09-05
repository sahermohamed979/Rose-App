'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { useRouter } from '@/i18n/navigation';
import { editProductAction } from '../actions/edit-product.action';
import { createProductFormData } from '../lib/create-product-form-data';
import type { EditProductFormValues } from '../schemas/edit-product-schema';

const SUGGESTED_PRODUCTS_QUERY_KEY = ['suggested-products'] as const;
const SEARCH_PRODUCTS_QUERY_KEY = ['search-products'] as const;

export function useEditProduct(
  productId: string,
  existingGallery: string[]
) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const t = useTranslations('dashboard.products');

  return useMutation({
    mutationFn: (values: EditProductFormValues) =>
      editProductAction(
        productId,
        createProductFormData(values),
        existingGallery
      ),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: SUGGESTED_PRODUCTS_QUERY_KEY,
        }),
        queryClient.invalidateQueries({
          queryKey: SEARCH_PRODUCTS_QUERY_KEY,
        }),
        queryClient.invalidateQueries({
          queryKey: ['product-info', productId],
        }),
      ]);

      toast.success(t('editSuccess'));
      router.push('/dashboard/products');
    },
    onError: () => {
      toast.error(t('editError'));
    },
  });
}
