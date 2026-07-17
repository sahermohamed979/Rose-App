'use client';
import { BellOff, BrushCleaning, CheckCheck } from 'lucide-react';

import NotificationCard from './notification-card';
import useNotificationList from '../../hooks/notification-hook';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useMemo } from 'react';
export default function NotificationsContainer() {
  const {
    data: notifications,
    fetchNextPage: fetchNextNotification,
    hasNextPage: hasNextNotification,
    isPending,
  } = useNotificationList();
  const memoNotifications = useMemo(
    () => notifications?.pages?.flatMap((page) => page.data) || [],
    [notifications]
  );
  console.log(notifications);
  return (
    <div className="max-w-[336px] mx-auto w-full flex flex-col border border-border-soft rounded-xl mt-10 min-h-[300px] max-h-[571px]">
      {/* notification header  */}
      <div className="py-4 px-4 bg-bg-primary-saturated  rounded-t-xl text-text-inverse font-bold text-xl ">
        Notifications ({notifications?.pages[0]?.metadata.total})
      </div>
      {/* filter and sort buttons */}
      <div className="flex  justify-between p-2.5">
        <span className="flex items-center gap-2 text-text-muted font-semibold text-xs ">
          {' '}
          <BrushCleaning size={18} />
          clear Notifications
        </span>
        <span className="flex items-center gap-2 text-text-muted font-semibold text-xs">
          <CheckCheck size={18} /> mark all as read
        </span>
      </div>
      {/* notification card  */}
      {isPending ||
        (notifications?.pages?.[0].data.length === 0 ? (
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
              {notifications?.pages.map((page) =>
                page.data.map((notification) => (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                  />
                ))
              )}
            </InfiniteScroll>
          </div>
        ))}

      {/* notification list */}
    </div>
  );
}
