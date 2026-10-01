import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { useRouter } from '@/i18n/navigation';
import { PRODUCT_QUERY_KEYS } from '@/shared/lib/constants/product-query-keys.constants';
import { addProductAction } from '../actions/add-product.action';
import { createProductFormData } from '../lib/create-product-form-data';
import { ProductActionError } from '../lib/product-action-error';
import type { AddNewProductFormValues } from '../schemas/add-product-schema';
export function useAddProduct() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const t = useTranslations('dashboard.products');

  return useMutation({
    mutationFn: async (values: AddNewProductFormValues) => {
      const result = await addProductAction(
        createProductFormData(values)
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
      ]);
      toast.success(t('addSuccess'));
      router.push('/dashboard/products');
    },
    onError: (error) => {
      const isExpectedError =
        error instanceof ProductActionError && error.message;

      toast.error(isExpectedError ? error.message : t('addError'));
    },
  });
}
