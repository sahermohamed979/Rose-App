import React from 'react';
import AuthTitle from '../components/authTitle';
import { useTranslations } from 'next-intl';

export default function LoginScreen() {
  const t = useTranslations();
  return (
    <div className="flex w-full flex-col gap-6">
      <AuthTitle authType="login" title={t('login.title')} />

      {/* login form goes here */}
    </div>
  );
}
