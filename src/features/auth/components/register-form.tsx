'use client';

import { Button } from '@/shared/components/ui/button';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { useRegister } from '../hooks/register-hook';
import { useOtpTimer } from '../hooks/otp-timer';
import { useEmailVerification } from '../hooks/email-verification-hook';
import { useOtpVerification } from '../hooks/otp-verification-hook';
import UserInfoStep from './user-info-step';
import OtpVerificationStep from './otp-verification-step';
import EmailInputStep from './email-input-step';
import PasswordStep from './password-step';
import { MoveRightIcon } from 'lucide-react';

interface RegisterFormProps {
  currentStep: number;
  setStep: (step: number) => void;
  onEmailChange: (email: string) => void;
}

export default function Registerform({
  currentStep,
  setStep,
  onEmailChange,
}: RegisterFormProps) {
  // states
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  // transilations
  const t = useTranslations('register');
  // hooks
  const { timeLeft, resetTimer, canResend } = useOtpTimer();
  // erorr helper
  const translateError = (key?: string) =>
    key ? t(`errors.${key}` as Parameters<typeof t>[0]) : '';
  const translateOtpError = (key: string) =>
    key ? t(`otp.${key}` as Parameters<typeof t>[0]) : '';
  const {
    verifyEmailMutate,
    isVerifyEmailPending,
    // errors: emailVerificationErrors
  } = useEmailVerification();
  const { confirmOtpMutate, isConfirmOtpPending } =
    useOtpVerification();
  // Form controller hooks
  const {
    handleSubmit,
    register,
    mutate,
    errors,
    isPending,
    control,
    trigger,
    getValues,
    formState,
  } = useRegister();
  //  handle email(step1)
  const handleStep1 = async () => {
    const valid = await trigger('email');
    if (!valid) {
      return;
    }

    const currentEmail = getValues('email');
    verifyEmailMutate(currentEmail, {
      onSuccess: () => {
        resetTimer();
        setOtp('');
        setStep(2);
      },
    });
  };
  // handle otp(step2)
  const handleStep2 = async () => {
    const currentEmail = getValues('email');
    if (!currentEmail) {
      toast.error(t('errors.emailMissing'));
      return;
    }

    if (!otp || otp.length !== 6) {
      toast.error(t('otp.invalid'));
      setOtpError(t('otp.invalid'));
      return;
    }
    setOtpError('');

    confirmOtpMutate(
      { email: currentEmail, code: otp },
      {
        onSuccess: () => {
          setOtpError('');
          onEmailChange(currentEmail);
          setStep(3);
        },
        onError: (error: Error) => {
          setOtpError(translateOtpError(error.message));
        },
      }
    );
  };
  // handle resend otp
  const handleResend = async () => {
    const currentEmail = getValues('email');
    if (!currentEmail) {
      toast.error(t('errors.emailMissing'));
      return;
    }
    resetTimer();
    setOtp('');

    verifyEmailMutate(currentEmail, {
      onSuccess: () => {
        resetTimer();
        setStep(2);
      },
    });
  };

  // Final Registration Submission (Step 4)
  const onFinalSubmit = handleSubmit(
    (data) => {
      mutate({
        ...data,
        email: getValues('email'),
      });
    },
    (formErrors) => {
      const firstError = Object.values(formErrors).find(
        (e) => e?.message
      );
      if (firstError?.message) {
        toast.error(translateError(firstError.message));
      }
    }
  );
  // Form Routing Logic
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    switch (currentStep) {
      case 1:
        return handleStep1();
      case 2:
        return handleStep2();
      case 4:
        return onFinalSubmit(e);
      default:
        return;
    }
  };

  // loading state for API requests
  const isLoading =
    isVerifyEmailPending ||
    isConfirmOtpPending ||
    isPending ||
    formState.isSubmitting;
  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        {/* step1 : email input */}
        <EmailInputStep
          currentStep={currentStep}
          onEmailChange={onEmailChange}
          register={register}
          errors={errors}
        />
        {/* step2 : otp verification */}
        <OtpVerificationStep
          currentStep={currentStep}
          setStep={setStep}
          otp={otp}
          setOtp={setOtp}
          otpError={otpError}
          handleResend={handleResend}
          canResend={canResend}
          timeLeft={timeLeft}
        />
        {/* step3 : personal information */}
        <UserInfoStep
          currentStep={currentStep}
          setStep={setStep}
          control={control}
          errors={errors}
          trigger={trigger}
        />
        {/* step4 : password security */}
        <PasswordStep
          currentStep={currentStep}
          control={control}
          errors={errors}
        />
        {/* form submit button  */}
        {currentStep !== 3 && (
          <Button
            className="w-full mt-9 mb-9 font-medium"
            variant={'default'}
            loading={isLoading}
            disabled={
              isLoading ||
              (currentStep === 1 && errors.email !== undefined) ||
              (currentStep === 1 && !getValues('email'))
            }
            type="submit"
          >
            {currentStep === 2 ? (
              t('otp.submitButton')
            ) : currentStep === 4 ? (
              t('submit')
            ) : (
              <>
                {t('next')}
                <MoveRightIcon className="size-4 ms-1 rtl:rotate-180" />
              </>
            )}
          </Button>
        )}
      </form>
    </div>
  );
}
