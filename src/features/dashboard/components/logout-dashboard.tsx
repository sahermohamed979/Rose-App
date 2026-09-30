'use client';
import { Link } from '@/i18n/navigation';
import { ThemeToggle } from '@/shared/components/ThemeToggle';
import { Button } from '@/shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import LangToggle from '@/shared/components/ui/langToggle';
import { IUser } from '@/shared/lib/types/api';
import { EllipsisVertical, LogOut, User } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';

export default function LogoutDashboard({
  userData,
}: {
  userData: IUser;
}) {
  const t = useTranslations();
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
          <h2 className="hidden md:inline-block pb-2 w-full text-text-primary text-sm font-semibold ms-3">
            {userData.firstName} {userData.lastName}
          </h2>
          <DropdownMenuItem
            className={'md:hidden'}
            render={
              <ThemeToggle className="w-full flex  justify-start" />
            }
          ></DropdownMenuItem>
          <DropdownMenuItem
            className={'md:hidden'}
            render={
              <LangToggle className="w-full flex  justify-start" />
            }
          ></DropdownMenuItem>
          <DropdownMenuItem>
            <User size={16} />
            <Link
              href="/account-setting"
              className="text-sm  text-text-plain"
            >
              {t('userMenu.account')}
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => signOut({ callbackUrl: '/login' })}
          >
            <LogOut size={16} />
            <span className="text-sm  text-text-plain">
              {' '}
              {t('userMenu.logout')}
            </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
