'use client';
import {
  DropdownMenuItem,
  DropdownMenuGroup,
} from '@/shared/components/ui/dropdown-menu';
import { Check, Trash2 } from 'lucide-react';
import { NotificationType } from '../types/notification-types';
import useMarkOneAsRead from '../hooks/mark-read-id-hook';
import { cn } from '@/shared/lib/utils/utils';
import useClearOneNotification from '../hooks/clear-one-notification';
import { useTranslations } from 'next-intl';

export default function NotificationButtons({
  notificationData,
}: {
  notificationData: NotificationType;
}) {
  // Translation
  const t = useTranslations('');
  // Mark one as read hook
  const { mutate: markOneAsRead } = useMarkOneAsRead();
  // Clear one notification hook
  const { mutate: clearOneNotification } = useClearOneNotification();
  return (
    <DropdownMenuGroup>
      <DropdownMenuItem
        disabled={notificationData.isRead}
        onClick={() => markOneAsRead(notificationData.id)}
      >
        {/*  Mark one as read */}
        <Check size={18} />
        <span
          className={cn(
            'text-sm text-text-plain',
            notificationData.isRead && 'text-text-soft'
          )}
        >
          {t('notifications.markRead')}
        </span>
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={() => clearOneNotification(notificationData.id)}
      >
        {/*  Clear one notification */}
        <Trash2
          size={18}
          className="text-bg-danger-saturated text-sm "
        />
        <span className="text-sm text-text-plain ">
          {t('notifications.delete')}
        </span>
      </DropdownMenuItem>
    </DropdownMenuGroup>
  );
}
