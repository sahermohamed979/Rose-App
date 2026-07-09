'use client';
import React from 'react';
import Registerform from '@/features/auth/components/register-form';
import { Link } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import AuthTitle from '@/features/auth/components/authTitle';
import RegisterScreen from '@/features/auth/screens/register-screen';

export default function RegisterPage() {
  const t = useTranslations('register');
  const locale = useLocale();
  return (
    <div>
      <RegisterScreen />
    </div>
  );
}
