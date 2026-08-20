'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { deleteCategory } from '../apis/delete-category.api';
import { CATEGORIES_QUERY_KEY } from './use-categories';

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  const t = useTranslations('categoryDashboard');

  return useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: (response) => {
      if (!response.status) {
        toast.error(response.message || t('deleteError'));
        return;
      }

      toast.success(t('deleteSuccess'));
      queryClient.invalidateQueries({
        queryKey: CATEGORIES_QUERY_KEY,
      });
    },
    onError: (error: Error) => {
      toast.error(error.message || t('deleteError'));
    },
  });
};
