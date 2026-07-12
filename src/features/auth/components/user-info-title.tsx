'use client';

import { Button } from '@/shared/components/ui/button';
import { useTranslations } from 'next-intl';

interface UserInfoTitleProps {
  email: string;
  currentStep: number;
  onStepChange: (step: number) => void;
}

export default function UserInfoTitle({
  email,
  currentStep,
  onStepChange,
}: UserInfoTitleProps) {
  // translations
  const t = useTranslations();

  return (
    <>
      {/* step2 titles */}
      <div className={currentStep !== 2 ? 'hidden' : 'block'}>
        <div className="border-b border-border-soft pb-6 mb-6">
          <h1 className="text-text-plain font-bold text-[30px] leading-[100%]">
            {t('register.createAccount')}
          </h1>
          <p className="text-text-primary font-semibold text-[20px] mt-2">
            {t('register.otp.title')}
          </p>
          <p className="text-sm mt-1 inline-block">
            {' '}
            {t('register.otp.subtitle', { email: email })}{' '}
          </p>
          <span>
            <Button
              variant="link"
              className="ms-.5 p-0 text-text-primary leading-none hover:text-text-primary-saturated text-sm"
              onClick={() => onStepChange(1)}
            >
              {' '}
              {t('register.edit')}
            </Button>
          </span>
        </div>
      </div>
      {/* step3 titles */}
      <div className={currentStep !== 3 ? 'hidden' : 'block'}>
        <div className="border-b border-border-soft pb-6 mb-6">
          <h1 className="text-text-plain font-bold text-[30px] leading-[100%]">
            {t('register.createAccount')}
          </h1>
          <p className="text-text-primary font-semibold text-[20px] mt-2">
            {t('register.aboutYou')}
          </p>
          <p className="text-sm mt-1"> {t('register.fewDetails')} </p>
        </div>
      </div>
      {/* step4 titles */}
      <div className={currentStep !== 4 ? 'hidden' : 'block'}>
        <div className="border-b border-border-soft pb-6 mb-6">
          <h1 className="text-text-plain font-bold text-[30px] leading-[100%]">
            {t('register.createAccount')}
          </h1>
          <p className="text-text-primary font-semibold text-[20px] mt-2">
            {t('register.strongPassword')}
          </p>
          <p className="text-sm mt-1">
            {t('register.securePassword')}{' '}
          </p>
        </div>
      </div>
    </>
  );
}
