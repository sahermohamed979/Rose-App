'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@/i18n/navigation';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { createCategory } from '../apis/create-category.api';
import {
  CATEGORIES_QUERY_KEY,
  CreateCategoryPayload,
} from '../types/categories-type';

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const t = useTranslations('categoryDashboard');

  return useMutation({
    mutationFn: (payload: CreateCategoryPayload) =>
      createCategory(payload),
    onSuccess: (response) => {
      if (!response.status) {
        toast.error(response.message || t('createError'));
        return;
      }

      toast.success(t('createSuccess'));
      router.push('/dashboard/categories');
      queryClient.invalidateQueries({
        queryKey: CATEGORIES_QUERY_KEY,
      });
    },
    onError: (error: Error) => {
      toast.error(error.message || t('createError'));
    },
  });
};
