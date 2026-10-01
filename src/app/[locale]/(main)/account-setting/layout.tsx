import AccountSideBar from '@/features/account-setting/components/side-bar';
import { useTranslations } from 'next-intl';
import React, { ReactNode } from 'react';

interface AccountLayoutProps {
  children: ReactNode;
}

export default function AccountLayout({
  children,
}: AccountLayoutProps) {
  const t = useTranslations('account-setting');

  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 md:px-9">
      {/* Header */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-plain mb-6">
        {t('account-setting')}
      </h1>
      {/* Body */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Sidebar — full-width on mobile, fixed-width on md+ */}
        <div className="w-full md:w-64 shrink-0">
          <AccountSideBar />
        </div>
        {/* Content */}
        <div className="flex-1 min-w-0 p-0 sm:p-2">{children}</div>
      </div>
    </div>
  );
}
