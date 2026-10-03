'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import {
  ChevronDown,
  User,
  Settings,
  LogOut,
  MapPinHouse,
  ScrollText,
} from 'lucide-react';

import { Link } from '@/i18n/navigation';
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/shared/components/ui/dropdown-menu';
import { HEADERS } from '@/shared/lib/constants/api.constants';
import AddressDialog from '@/features/checkout/components/address-dialog';
import {
  getPushSubscription,
  isPushSupported,
} from '../../notifications/utils/push.util';

interface HeaderDropdownProps {
  name?: string;
  onOpenAddresses?: () => void;
}

export default function HeaderDropdown({
  name = '',
  onOpenAddresses,
}: HeaderDropdownProps) {
  // Translation
  const t = useTranslations('');

  // State
  const [internalAddressOpen, setInternalAddressOpen] =
    useState(false);

  // Hooks
  const { data: session } = useSession();

  // Functions
  const handleOpenAddresses = () => {
    if (onOpenAddresses) {
      onOpenAddresses();
    } else {
      setInternalAddressOpen(true);
    }
  };

  async function handleLogout() {
    try {
      if (isPushSupported()) {
        const subscription = await getPushSubscription();

        if (subscription) {
          await fetch('/api/notifications/subscriptions', {
            method: 'DELETE',
            headers: { ...HEADERS.jsonBody },
            body: JSON.stringify({ endpoint: subscription.endpoint }),
          });
          await subscription.unsubscribe();
        }
      }
    } catch {
      // Best-effort cleanup — never block logout
    } finally {
      signOut({ callbackUrl: '/' });
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <button type="button" aria-label="User menu">
              <ChevronDown size={18} />
            </button>
          }
        />
        <DropdownMenuContent className="w-56 bg-bg-plain">
          {/* User name header */}
          <div className="px-1 py-1 text-xl font-bold text-text-primary">
            {name}
          </div>

          <DropdownMenuSeparator />

          {/* Main nav items */}
          <DropdownMenuGroup>
            <DropdownMenuItem className="flex items-center gap-3 px-2 py-2 text-base cursor-pointer">
              <User size={16} />
              <Link href="/account-setting">
                {t('userMenu.account')}
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem
              className="flex items-center gap-3 px-2 py-2 text-base cursor-pointer"
              onClick={handleOpenAddresses}
            >
              <MapPinHouse size={16} />
              <span>{t('userMenu.addresses')}</span>
            </DropdownMenuItem>

            <Link href="/orders">
              <DropdownMenuItem className="flex items-center gap-3 px-2 py-2 text-base cursor-pointer">
                <ScrollText size={16} />
                {t('userMenu.orders')}
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>

          {session?.user?.role === 'ADMIN' && (
            <DropdownMenuGroup>
              <DropdownMenuItem className="flex items-center gap-3 px-2 py-2 text-base cursor-pointer">
                <Settings size={16} />
                <Link href="/dashboard">
                  {t('userMenu.dashboard')}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          )}

          {/* Log out — separated at bottom */}
          <DropdownMenuItem
            className="flex items-center gap-3 px-2 py-2 text-base cursor-pointer"
            onClick={() => handleLogout()}
          >
            <LogOut size={16} />
            {t('userMenu.logout')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {!onOpenAddresses && (
        <AddressDialog
          open={internalAddressOpen}
          onOpenChange={setInternalAddressOpen}
        />
      )}
    </>
  );
}
