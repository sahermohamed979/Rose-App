'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@/i18n/navigation';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import {
  CreateOccasionPayload,
  OCCASIONS_QUERY_KEY,
} from '../types/occasions-type';
import { createOccasion } from '../apis/create-occasion.api';

export const useCreateOccasion = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const t = useTranslations('occasionDashboard');

  return useMutation({
    mutationFn: (payload: CreateOccasionPayload) =>
      createOccasion(payload),
    onSuccess: (response) => {
      if (!response.status) {
        const fieldError = response.errors?.[0]?.message;
        toast.error(
          fieldError || response.message || t('createError')
        );
        return;
      }

      toast.success(t('createSuccess'));
      router.push('/dashboard/occasions');
      queryClient.invalidateQueries({
        queryKey: OCCASIONS_QUERY_KEY,
      });
    },
    onError: (error: Error) => {
      toast.error(error.message || t('createError'));
    },
  });
};
