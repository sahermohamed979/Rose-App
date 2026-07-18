import {
  DropdownMenuItem,
  DropdownMenuGroup,
} from '@/shared/components/ui/dropdown-menu';
import { Check, Trash2 } from 'lucide-react';
import { NotificationType } from '../types/notification-types';
import useMarkOneAsRead from '../hooks/mark-read-id-hook';
import { cn } from '@/shared/lib/utils/utils';

export default function NotificationButtons({
  notificationData,
}: {
  notificationData: NotificationType;
}) {
  const { mutate: markOneAsRead } = useMarkOneAsRead();

  return (
    <DropdownMenuGroup>
      <DropdownMenuItem
        disabled={notificationData.isRead}
        className=" "
        onClick={() => markOneAsRead(notificationData.id)}
      >
        <Check size={18} />
        <span
          className={cn(
            'text-sm text-text-plain',
            notificationData.isRead && 'text-text-soft'
          )}
        >
          Mark as read
        </span>
      </DropdownMenuItem>
      <DropdownMenuItem variant="default">
        <Trash2
          size={18}
          className="text-bg-danger-saturated text-sm "
        />
        <span className="text-sm text-text-plain ">
          Delete notification
        </span>
      </DropdownMenuItem>
    </DropdownMenuGroup>
  );
}
