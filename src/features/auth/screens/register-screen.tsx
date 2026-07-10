import { useTranslations } from 'next-intl';
import RegisterForm from '../components/register-form';
import AuthTitle from '@/features/auth/components/authTitle';
import UserInfoTitle from '@/features/auth/components/user-info-title';
import { Stepper } from '../components/stepper';
import { useSearchParams } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { useEffect, useState } from 'react';
export default function RegisterScreen() {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  useEffect(() => {
    console.log('Current step is:', step);
  }, [step]);
  const email = searchParams.get('email') || 'example@example.com';
  return (
    <div className="flex w-full flex-col gap-3">
      {/* header */}
      <AuthTitle authType="register" title={t('auth.headerTitle')} />
      {/* stepper */}
      {step !== 1 ? (
        <Stepper currentStep={step} onStepChange={setStep} />
      ) : (
        <p> الآن في الخطوة الأولى</p>
      )}
      {/* current step title */}
      <UserInfoTitle email={email} />
      {/* Register form goes here */}
      <RegisterForm />

      {/* footer*/}
      {step === 1 ? (
        <div className="border-border-muted border-t pt-4 text-center ">
          <p className="text-sm text-text-plain font-medium leading-none">
            {t('register.alreadyHaveAccount')}
            <Link
              className="text-text-primary hover:text-text-primary-saturated font-bold"
              href={'/login'}
            >
              {' '}
              {t('register.login')}
            </Link>
          </p>
        </div>
      ) : (
        <div className="border-border-muted border-t pt-4 text-center ">
          <p className="flex justify-center my-2">
            {t('register.needHelp')}
            <span className="text-text-primary ms-1">
              {t('register.contactUs')}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
