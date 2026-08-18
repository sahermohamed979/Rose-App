import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { deleteProductAction } from '../apis/delete-product.api';

export function useDeleteProduct() {
  const t = useTranslations('products'); 

  return useMutation({
    mutationFn: async (productId: string) => {
      return await deleteProductAction(productId);
    },
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(t('deleteSuccess'));
      } else {
        toast.error(t('deleteError'));
      }
    },
    onError: () => {
      toast.error(t('unexpectedError'));
    },
  });
}