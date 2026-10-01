'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { deleteOccasion } from '../apis/delete-occasion.api';
import { OCCASIONS_QUERY_KEY } from '../types/occasions-type';
import { useRouter } from '@/i18n/navigation';
export const useDeleteOccasion = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const t = useTranslations('occasionDashboard');

  return useMutation({
    mutationFn: (id: string) => deleteOccasion(id),
    onSuccess: (response) => {
      if (!response.status) {
        toast.error(response.message || t('deleteError'));
        return;
      }

      toast.success(t('deleteSuccess'));
      queryClient.invalidateQueries({
        queryKey: OCCASIONS_QUERY_KEY,
      });
      router.refresh();
    },
    onError: (error: Error) => {
      toast.error(error.message || t('deleteError'));
    },
  });
};
