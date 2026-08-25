'use client';
import React from 'react';
import { Lock, LogOut, UserRoundPen } from 'lucide-react';
import { cn } from '@/shared/lib/utils/utils';
import { Link, usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { Button } from '@/shared/components/ui/button';

export default function AccountSideBar() {
  // Custom Hooks
  const t = useTranslations('account-setting');
  const pathname = usePathname();

  // Paths
  const profilePath = '/account-setting';
  const passwordPath = '/account-setting/change-password';

  //   State
  const isProfileActive = pathname === profilePath;
  const isPasswordActive = pathname === passwordPath;

  return (
    <div className="w-64 bg-bg-subtle border border-border-subtle rounded-xl p-4 flex flex-col justify-between min-h-svh">
      {/* Links */}
      <div className="space-y-4">
        <Link
          href={profilePath}
          className={cn(
            'flex items-center gap-3 px-4 py-2.5 rounded-md font-medium transition-colors',
            isProfileActive
              ? 'bg-bg-inverse text-text-inverse'
              : 'text-text-plain hover:bg-bg-muted'
          )}
        >
          <UserRoundPen size={25} />
          {t('profile')}
        </Link>

        <Link
          href={passwordPath}
          className={cn(
            'flex items-center gap-3 px-4 py-2.5 rounded-md font-medium transition-colors',
            isPasswordActive
              ? 'bg-bg-inverse text-text-inverse'
              : 'text-text-plain hover:bg-bg-muted'
          )}
        >
          <Lock size={25} />
          {t('change-password')}
        </Link>
      </div>

      {/* Logout */}
      <div className="border-t border-border-subtle">
        <Button
          className="w-full mt-4 text-text-danger hover:bg-bg-muted justify-start px-4"
          variant="ghost"
        >
          <LogOut size={25} className="mr-2 text-text-danger" />
          {t('logout')}
        </Button>
      </div>
    </div>
  );
}
