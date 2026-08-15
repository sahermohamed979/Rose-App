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
import useUnreadCount from '../hooks/use-unread-count';
import usePushStatus from '../hooks/use-push-status';
import { useTranslations } from 'next-intl';
import NotificationsSkeleton from '../skeletons/notifications-skeleton';
import PushNotificationBanner from './push-notification-banner';
export default function NotificationsContainer({
  status,
}: {
  status: string;
}) {
  // Translation
  const t = useTranslations();
  // Notification Hook
  const {
    data: notificationData,
    fetchNextPage: fetchNextNotification,
    hasNextPage: hasNextNotification,
    isPending,
  } = useNotificationList();
  // Memoize notifications
  const memoNotifications = useMemo(
    () => notificationData?.pages?.flatMap((page) => page.data) || [],
    [notificationData]
  );
  // count unread notifications
  const { data: unreadCountData } = useUnreadCount({
    enabled: status === 'authenticated',
  });
  const unreadCount = unreadCountData?.unreadCount ?? 0;
  // push status (gates the opt-in banner)
  const { data: pushStatusData } = usePushStatus({
    enabled: status === 'authenticated',
  });
  const isPushConfigured = pushStatusData?.pushConfigured === true;
  // Mark all as read hook
  const { mutate: markAllAsRead } = useMarkAllAsRead();
  // Clear all notifications hook
  const { mutate: clearAllNotifications } =
    useClearAllNotifications();

  return (
    <DropdownMenu>
      {/*  Dropdown menu trigger */}
      <DropdownMenuTrigger
        render={
          <button
            className="relative"
            disabled={status !== 'authenticated'}
          >
            <Bell className="w-5 h-5 cursor-pointer" />
            {status === 'authenticated' && (
              <span
                className={cn(
                  `absolute -top-2 -right-2 bg-bg-danger text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm`,
                  unreadCount === 0 && 'hidden'
                )}
              >
                {unreadCount}
              </span>
            )}
          </button>
        }
      />
      {/*  Dropdown menu content */}
      <DropdownMenuContent className="relative w-84 overflow-hidden p-0 !bg-popover before:hidden">
        <div className=" flex flex-col   ">
          {/* notification header  */}
          <div className="py-4 px-4 bg-bg-primary-saturated   rounded-t-xl text-text-inverse font-bold text-xl ">
            {t('notifications.title')} ({unreadCount})
          </div>
          {/* filter and sort buttons */}
          <div className="flex  justify-between   w-full  bg-bg-plain  p-2.5">
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
              {t('notifications.clearAll')}
            </button>
            <button
              onClick={() => markAllAsRead()}
              disabled={unreadCount === 0}
              className={cn(
                `cursor-pointer flex items-center gap-2 text-text-plain font-semibold text-xs`,
                unreadCount === 0 &&
                  'text-text-muted cursor-not-allowed'
              )}
            >
              <CheckCheck size={18} />{' '}
              {t('notifications.markAllRead')}
            </button>
          </div>

          {/* push notification banner */}
          {isPushConfigured && <PushNotificationBanner />}
          {/* notification card  */}
          {isPending ? (
            <NotificationsSkeleton />
          ) : notificationData?.pages[0]?.metadata.total === 0 ? (
            <div className="flex h-[224px] items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <BellOff size={50} className="text-text-soft" />
                <h2 className="text-text-soft font-medium text-sm">
                  {t('notifications.empty')}
                </h2>
              </div>
            </div>
          ) : (
            <div className="flex-1">
              <InfiniteScroll
                className="flex flex-col justify-items-center"
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
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
