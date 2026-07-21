import { useMutation } from '@tanstack/react-query';
import { markAllAsReadServerAction } from '../apis/notification-action';
import { useQueryClient } from '@tanstack/react-query';
import { NOTIFICATION_OPTIONS } from '../constants/notification-prams';

export default function useMarkAllAsRead() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: () => markAllAsReadServerAction(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: NOTIFICATION_OPTIONS.list(1),
      });
    },
  });
  return { mutate };
}
