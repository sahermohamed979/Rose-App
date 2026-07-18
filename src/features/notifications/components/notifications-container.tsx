'use client';
import {
  Bell,
  BellOff,
  BrushCleaning,
  CheckCheck,
} from 'lucide-react';

import NotificationCard from './notification-card';
import useNotificationList from '../hooks/notification-hook';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useMemo } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { cn } from '@/shared/lib/utils/utils';
import useMarkAllAsRead from '../hooks/mark-all-read-hook';
import useClearAllNotifications from '../hooks/clear-notification-all-hook';
export default function NotificationsContainer({
  status,
}: {
  status: string;
}) {
  const {
    data: notificationData,
    fetchNextPage: fetchNextNotification,
    hasNextPage: hasNextNotification,
    isPending,
  } = useNotificationList();
  const memoNotifications = useMemo(
    () => notificationData?.pages?.flatMap((page) => page.data) || [],
    [notificationData]
  );
  const { mutate: markAllAsRead } = useMarkAllAsRead();
  const { mutate: clearAllNotifications } =
    useClearAllNotifications();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button className="relative">
            <Bell className="w-5 h-5 cursor-pointer" />
            {status === 'authenticated' && (
              <span className="absolute -top-2 -right-2 bg-bg-danger text-text-inverse text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm">
                {notificationData?.pages[0]?.metadata.total}
              </span>
            )}
          </button>
        }
      />
      <DropdownMenuContent
        className={` min-h-[300px] max-h-[571px] w-[336px] p-0 `}
      >
        <div className=" flex flex-col ">
          {/* notification header  */}
          <div className="py-4 px-4 bg-bg-primary-saturated  rounded-t-xl text-text-inverse font-bold text-xl ">
            Notifications (
            {notificationData?.pages[0]?.metadata.total})
          </div>
          {/* filter and sort buttons */}
          <div className="flex  justify-between p-2.5">
            <button
              onClick={() => clearAllNotifications()}
              disabled={
                notificationData?.pages[0]?.metadata.total === 0
              }
              className={cn(
                `flex items-center gap-2 text-text-plain font-semibold text-xs cursor-pointer`,
                notificationData?.pages[0]?.metadata.total === 0 &&
                  'text-text-muted cursor-not-allowed'
              )}
            >
              {' '}
              <BrushCleaning size={18} className="" />
              clear Notifications
            </button>
            <span
              onClick={() => markAllAsRead()}
              className={cn(
                `cursor-pointer flex items-center gap-2 text-text-plain font-semibold text-xs`,
                notificationData?.pages[0]?.metadata.total === 0 &&
                  'text-text-muted cursor-not-allowed'
              )}
            >
              <CheckCheck size={18} /> mark all as read
            </span>
          </div>
          {/* notification card  */}
          {isPending ||
            (notificationData?.pages[0]?.metadata.total === 0 ? (
              <div className="flex-1 flex items-center justify-center">
                {' '}
                <div className="flex flex-col gap-2 items-center">
                  <BellOff size={50} className="text-text-soft" />
                  <h2 className="text-text-soft font-medium text-sm">
                    No notifications to display.
                  </h2>
                </div>
              </div>
            ) : (
              <div className="flex-1 ">
                <InfiniteScroll
                  className="flex flex-col   justify-items-center [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                  dataLength={memoNotifications?.length || 0}
                  next={fetchNextNotification}
                  hasMore={!!hasNextNotification}
                  height={450}
                  loader={<></>}
                >
                  {memoNotifications?.map((notification) => (
                    <NotificationCard
                      key={notification.id}
                      notificationData={notification}
                    />
                  ))}
                </InfiniteScroll>
              </div>
            ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
