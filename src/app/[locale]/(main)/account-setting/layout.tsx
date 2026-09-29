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
    <div className="min-h-screen  py-6 px-4">
      {/* Header */}
      <h1 className="text-5xl font-bold text-text-plain mb-4">
        {t('account-setting')}
      </h1>
      {/* Body */}
      <div className="flex flex-col md:flex-row gap-3">
        {/* Sidebar */}
        <AccountSideBar />
        {/* Content */}
        <div className="flex-1 p-4">{children}</div>
      </div>
    </div>
  );
}
