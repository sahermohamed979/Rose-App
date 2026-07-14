import React from 'react';
import AuthTitle from '../components/authTitle';
import { useTranslations } from 'next-intl';
import LoginForm from '../components/login-form';
import { Link } from '@/i18n/navigation';

export default function LoginScreen() {
  const t = useTranslations();
  return (
    <div className="flex w-full flex-col gap-2">
      <AuthTitle authType="login" title={t('login.title')} />

      {/* login form goes here */}
      <LoginForm />

      {/* No account */}
      <p className="text-center text-sm text-text-plain font-medium">
        {t('login.noAccount')}{' '}
        <Link
          className="text-text-primary font-medium"
          href="/register"
        >
          {t('login.createAccount')}
        </Link>
      </p>
    </div>
  );
}
