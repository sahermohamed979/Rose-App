import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/shared/components/ui/dropdown-menu';
import { Button } from '@base-ui/react/button';
import { EllipsisVertical } from 'lucide-react';
import { NotificationType } from '../types/notification-types';
import { Link } from '@/i18n/navigation';
import { cn } from '@/shared/lib/utils/utils';
import NotificationButtons from './notification-buttons';

export default function NotificationCard({
  notificationData,
}: {
  notificationData: NotificationType;
}) {
  return (
    <div
      className={cn(
        `w-full flex flex-col px-3 py-2 border-t border-border-soft max-h-[100px] h-auto`,
        notificationData.isRead && 'bg-bg-soft'
      )}
    >
      <div className="max-w-[304px]">
        <div className=" flex items-center justify-between">
          <Link href={notificationData.link}>
            <h3 className="text-text-plain font-semibold">
              {notificationData.title}
            </h3>
          </Link>
          <span>
            {/* <EllipsisVertical size={18} className="text-text-soft" /> */}

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
              <DropdownMenuContent className="w-full p-2.5">
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
