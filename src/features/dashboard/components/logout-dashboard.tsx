'use client';
import { Link } from '@/i18n/navigation';
import { Button } from '@/shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { IUser } from '@/shared/lib/types/api';
import { EllipsisVertical, LogOut, User } from 'lucide-react';
import { signOut } from 'next-auth/react';

export default function LogoutDashboard({
  UserData,
}: {
  UserData: IUser;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button className="h-8 w-8 p-0 rounded-md" variant="subtle">
            <EllipsisVertical size={18} />
          </Button>
        }
      ></DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-2 ">
        <DropdownMenuGroup>
          <h2 className="pb-2 w-full text-text-primary text-sm semibold ms-3">
            {UserData.firstName} {UserData.lastName}
          </h2>

          <DropdownMenuItem>
            <User size={16} />
            <Link
              href="/account"
              className="text-sm  text-text-plain"
            >
              Profile
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => signOut({ callbackUrl: '/login' })}
          >
            <LogOut size={16} />
            <span className="text-sm  text-text-plain">Logout</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
