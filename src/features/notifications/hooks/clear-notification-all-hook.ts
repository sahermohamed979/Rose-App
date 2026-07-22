import { useMutation } from '@tanstack/react-query';
import { clearAllNotificationsServerAction } from '../apis/notification-action';
import { useQueryClient } from '@tanstack/react-query';
import { NOTIFICATION_OPTIONS } from '../constants/notification-prams';

export default function useClearAllNotifications() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: () => clearAllNotificationsServerAction(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: NOTIFICATION_OPTIONS.list(1),
      });
    },
  });
  return { mutate };
}
