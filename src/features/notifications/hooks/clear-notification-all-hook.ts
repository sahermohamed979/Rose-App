import { useMutation } from '@tanstack/react-query';
import { clearAllNotificationsServerAction } from '../apis/notification-action';
import { useQueryClient } from '@tanstack/react-query';
import { NOTIFICATION_OPTIONS } from '../constants/notification-prams';
import { DEFAULT_PAGINATION } from '@/shared/lib/constants/api.constants';

export default function useClearAllNotifications() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: () => clearAllNotificationsServerAction(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: NOTIFICATION_OPTIONS.list(1, DEFAULT_PAGINATION),
      });
      console.log('clear all notifications');
    },
  });
  return { mutate };
}
