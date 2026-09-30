'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import AuthTitle from '@/features/auth/components/authTitle';
import UserInfoTitle from '@/features/auth/components/user-info-title';
import { Link } from '@/i18n/navigation';

import RegisterForm from '../components/register-form';
import { Stepper } from '../components/stepper';
export default function RegisterScreen() {
  // translations
  const t = useTranslations();
  // State for step flow
  const [step, setStep] = useState(1);
  // State for email display
  const [displayEmail, setDisplayEmail] = useState('');
  return (
    <div className="flex w-full flex-col gap-3">
      {/* header */}
      <AuthTitle authType="register" title={t('auth.headerTitle')} />
      {/* Stepper (hidden on step 1) */}
      {step !== 1 && (
        <Stepper currentStep={step} onStepChange={setStep} />
      )}
      {/* current step title */}
      <UserInfoTitle
        email={displayEmail}
        currentStep={step}
        onStepChange={setStep}
      />
      {/* Register form goes here */}
      <RegisterForm
        currentStep={step}
        setStep={setStep}
        onEmailChange={setDisplayEmail}
      />

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
        <div className="border-border-muted border-t mt-9 text-center ">
          <p className="flex justify-center mt-5">
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
