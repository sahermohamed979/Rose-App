import { useMutation } from '@tanstack/react-query';
import { markOneAsReadServerAction } from '../apis/notification-action';
import { useQueryClient } from '@tanstack/react-query';
import { NOTIFICATION_OPTIONS } from '../constants/notification-prams';
import { DEFAULT_PAGINATION } from '@/shared/lib/constants/api.constants';

export default function useMarkOneAsRead() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (id: string) => markOneAsReadServerAction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: NOTIFICATION_OPTIONS.list(1, DEFAULT_PAGINATION),
      });
    },
  });
  return { mutate };
}
