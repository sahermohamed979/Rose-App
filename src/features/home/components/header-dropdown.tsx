import { Link } from '@/i18n/navigation';
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/shared/components/ui/dropdown-menu';
import {
  ChevronDown,
  User,
  Settings,
  LogOut,
  MapPinHouse,
  ScrollText,
} from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';

export default function HeaderDropdown({ name }: { name: string }) {
  // Translation

  const t = useTranslations('');
  // get user role
  const { data: session } = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button>
            <ChevronDown size={18} />
          </button>
        }
      />
      <DropdownMenuContent className="w-[224px] bg-bg-plain ">
        {/* User name header */}
        <div className="px-1 py-1 text-xl font-bold text-text-primary">
          {name}
        </div>

        <DropdownMenuSeparator />

        {/* Main nav items */}
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex items-center gap-3 px-2 py-2 text-base cursor-pointer">
            <User size={16} />
            <Link href="/account">{t('userMenu.account')}</Link>
          </DropdownMenuItem>

          <DropdownMenuItem className="flex items-center gap-3 px-2 py-2 text-base cursor-pointer">
            <MapPinHouse size={16} />
            <Link href="/addresses">{t('userMenu.addresses')}</Link>
          </DropdownMenuItem>

          <DropdownMenuItem className="flex items-center gap-3 px-2 py-2 text-base cursor-pointer">
            <ScrollText size={16} />
            <Link href="/orders">{t('userMenu.orders')}</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        {session?.user?.role === 'ADMIN' && (
          <DropdownMenuGroup>
            <DropdownMenuItem className="flex items-center gap-3 px-2 py-2 text-base cursor-pointer">
              <Settings size={16} />
              <Link href="/dashboard">{t('userMenu.dashboard')}</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        )}
        {/* Log out — separated at bottom */}
        <DropdownMenuItem
          className="flex items-center gap-3 px-2 py-2 text-base cursor-pointer"
          onClick={() => signOut({ callbackUrl: '/' })}
        >
          <LogOut size={16} />
          {t('userMenu.logout')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
