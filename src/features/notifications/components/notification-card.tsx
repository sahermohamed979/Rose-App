'use client';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/shared/components/ui/dropdown-menu';
import { Button } from '@base-ui/react/button';
import { EllipsisVertical } from 'lucide-react';
import { NotificationType } from '../types/notification-types';
import { useRouter } from '@/i18n/navigation';
import { cn } from '@/shared/lib/utils/utils';
import useMarkOneAsRead from '../hooks/mark-read-id-hook';
import NotificationButtons from './notification-buttons';

export default function NotificationCard({
  notificationData,
}: {
  notificationData: NotificationType;
}) {
  // Navigation
  const router = useRouter();

  // Mark one as read hook
  const { mutate: markOneAsRead } = useMarkOneAsRead();

  // Functions
  function handleCardClick() {
    if (!notificationData.isRead) {
      markOneAsRead(notificationData.id);
    }

    if (notificationData.link) {
      if (notificationData.link.startsWith('http')) {
        window.location.assign(notificationData.link);
      } else {
        router.push(notificationData.link);
      }
    }
  }

  return (
    <div
      onClick={handleCardClick}
      className={cn(
        `w-full flex flex-col px-3 py-2 border-t border-border-soft max-h-[100px] h-auto cursor-pointer`,
        notificationData.isRead && 'bg-bg-soft'
      )}
    >
      <div className="max-w-[304px]">
        <div className=" flex items-center justify-between">
          <h3 className="text-text-plain font-semibold">
            {notificationData.title}
          </h3>
          <span onClick={(event) => event.stopPropagation()}>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button>
                    <EllipsisVertical
                      size={18}
                      className="text-text-soft"
                    />
                  </Button>
                }
              />
              <DropdownMenuContent className="w-full p-2.5 bg-popover! before:hidden">
                <NotificationButtons
                  notificationData={notificationData}
                />
              </DropdownMenuContent>
            </DropdownMenu>
          </span>
        </div>
        <p className=" text-text-soft line-clamp-3 text-sm/4.5 overflow-hidden">
          {notificationData.message}
        </p>
      </div>
    </div>
  );
}
