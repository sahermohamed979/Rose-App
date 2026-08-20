// features/categories/hooks/use-update-category.ts
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@/i18n/navigation';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { updateCategory } from '../apis/update-category.api';
import { CATEGORIES_QUERY_KEY } from './use-categories';
import { UpdateCategoryPayload } from '../types/categories-type';

export const useUpdateCategory = (id: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const t = useTranslations('categoryDashboard');

  return useMutation({
    mutationFn: (payload: UpdateCategoryPayload) =>
      updateCategory(id, payload),
    onSuccess: (response) => {
      if (!response.status) {
        throw new Error(response.message);
      }
      queryClient.invalidateQueries({
        queryKey: CATEGORIES_QUERY_KEY,
      });
      queryClient.invalidateQueries({ queryKey: ['categories', id] });

      toast.success(t('updateSuccess'));

      router.push('/dashboard/categories');
    },
    onError: (error: Error) => {
      toast.error(error.message || t('updateError'));
    },
  });
};
