import React from 'react';
import Image from 'next/image';
import { getUserProfile } from '../api/user-service';
import LogoutDashboard from './logout-dashboard';
import { Badge } from '@/shared/components/ui/badge';
import { AlertTriangle } from 'lucide-react';

export default async function UserInfo() {
  const UserInfo = await getUserProfile();

  if (!UserInfo.status) {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-border-danger bg-bg-danger-fade px-2 py-1.5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border-danger text-text-danger">
          <AlertTriangle className="size-4" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold leading-tight text-text-danger">
            Profile unavailable
          </p>
          <Badge variant="destructive" className="mt-1">
            Error
          </Badge>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center md:justify-between md:gap-2  gap-1 ">
      <div className={`relative shrink-0 w-12 h-12  `}>
        {UserInfo.payload?.user?.photo ? (
          <Image
            src={UserInfo.payload?.user?.photo}
            alt="User Avatar"
            width={55}
            height={55}
            className={`object-cover h-full w-full rounded-full`}
          />
        ) : (
          <div
            className={`flex bg-red-500 rounded-[40.5px] items-center justify-center w-full bg-linear-to-r  h-full`}
          ></div>
        )}
      </div>
      <div className="md:flex-1 md:min-w-0">
        {' '}
        <span
          className={`md:block text-sm font-bold text-text-plain hidden`}
        >
          {UserInfo?.payload?.user?.firstName}{' '}
          {UserInfo?.payload?.user?.lastName}
        </span>
        <p className="text-xs text-text-muted hidden md:block ">
          {UserInfo?.payload?.user?.email}
        </p>{' '}
      </div>
      <div className="md:shrink-0">
        {' '}
        <LogoutDashboard UserData={UserInfo.payload!.user!} />
      </div>
    </div>
  );
}
