import React from 'react';
import Image from 'next/image';
import LogoutDashboard from './logout-dashboard';
import { Badge } from '@/shared/components/ui/badge';
import { AlertTriangle } from 'lucide-react';
import AvatarFallback from './avatar-fallback';
import { getTranslations } from 'next-intl/server';
import type { getUserProfile } from '../api/user-service';

type UserProfile = Awaited<ReturnType<typeof getUserProfile>>;

export default async function UserInfo({
  userProfile,
}: {
  userProfile: UserProfile;
}) {
  const t = await getTranslations('dashboard.userInfo');

  if (!userProfile.status) {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-border-danger bg-bg-danger-fade px-2 py-1.5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border-danger text-text-danger">
          <AlertTriangle className="size-4" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold leading-tight text-text-danger">
            {t('profileUnavailable')}
          </p>
          <Badge variant="destructive" className="mt-1">
            {t('error')}
          </Badge>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center md:justify-between md:gap-2  gap-1 ">
      <div className={`relative shrink-0 w-12 h-12  `}>
        {userProfile.payload?.user?.photo ? (
          <Image
            src={userProfile.payload?.user?.photo}
            alt="User Avatar"
            width={55}
            height={55}
            className={`object-cover h-full w-full rounded-full`}
          />
        ) : (
          <AvatarFallback
            letter={(userProfile.payload?.user?.firstName ??
              '?')[0].toUpperCase()}
            userId={userProfile.payload?.user?.id ?? ''}
          />
        )}
      </div>
      <div className="md:flex-1 md:min-w-0">
        {' '}
        <span
          className={`md:block text-sm font-bold text-text-plain hidden`}
        >
          {userProfile?.payload?.user?.firstName}{' '}
          {userProfile?.payload?.user?.lastName}
        </span>
        <p className="text-xs text-text-muted hidden md:block ">
          {userProfile?.payload?.user?.email}
        </p>{' '}
      </div>
      <div className="md:shrink-0">
        {' '}
        <LogoutDashboard userData={userProfile.payload!.user!} />
      </div>
    </div>
  );
}
