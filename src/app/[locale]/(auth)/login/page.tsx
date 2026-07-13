import { useTranslations } from 'next-intl';
import AuthHeader from '@/features/auth/components/auth-title';
import LoginForm from '@/features/auth/login/_components/login-form';

export default function Login() {
  const t = useTranslations('login');

  return (
    <>
      {/* Page title rendered via AuthHeader (uses edwardian font from layout) */}
      <AuthHeader title={t('title')} authType="login" />

      {/* Subtitle */}
      <p className="text-center text-sm text-text-muted mb-6 -mt-2">
        {t('subtitle')}
      </p>

      <LoginForm />
    </>
  );
}
