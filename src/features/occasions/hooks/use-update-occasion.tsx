'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@/i18n/navigation';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { updateOccasion } from '../apis/update-occasion.api';
import { OCCASIONS_QUERY_KEY } from './use-occasions';
import { UpdateOccasionPayload } from '../types/occasions-type';

export const useUpdateOccasion = (id: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const t = useTranslations('occasionDashboard');

  return useMutation({
    mutationFn: (payload: UpdateOccasionPayload) =>
      updateOccasion(id, payload),
    onSuccess: (response) => {
      if (!response.status) {
        throw new Error(response.message);
      }
      queryClient.invalidateQueries({
        queryKey: OCCASIONS_QUERY_KEY,
      });
      queryClient.invalidateQueries({ queryKey: ['occasions', id] });

      toast.success(t('updateSuccess'));

      router.push('/dashboard/occasions');
    },
    onError: (error: Error) => {
      toast.error(error.message || t('updateError'));
    },
  });
};
