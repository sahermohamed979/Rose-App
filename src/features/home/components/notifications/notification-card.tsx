import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/shared/components/ui/dropdown-menu';
import { Button } from '@base-ui/react/button';
import { Check, EllipsisVertical, Trash2 } from 'lucide-react';
import { NotificationData } from '../../types/notification-types';
import { Link } from '@/i18n/navigation';

export default function NotificationCard({
  notification,
}: {
  notification: NotificationData;
}) {
  return (
    <div className="w-full flex flex-col px-3 py-2 border-t border-border-soft max-h-[100px] h-auto  ">
      <div className="max-w-[304px]">
        <div className=" flex items-center justify-between">
          <Link href={notification.link}>
            <h3 className="text-text-plain font-semibold">
              {notification.title}
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
                <DropdownMenuGroup>
                  <DropdownMenuItem className=" ">
                    <Check size={18} />
                    <span className="text-sm text-text-plain">
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
              </DropdownMenuContent>
            </DropdownMenu>
          </span>
        </div>
        <p className=" text-text-soft line-clamp-3 text-sm/4.5 overflow-hidden">
          {notification.message}
        </p>
      </div>
    </div>
  );
}
