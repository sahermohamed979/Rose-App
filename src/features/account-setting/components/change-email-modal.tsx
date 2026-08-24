'use client';

import { useState } from 'react';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/shared/components/ui/input-otp';
import { Button } from '@/shared/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ChangeEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  step: number;
  setStep: (step: number) => void;
  newEmail: string;
  setNewEmail: (email: string) => void;
  timer: number;
  handleNextStep: () => void;
  handleResendCode: () => void;
  handleVerifyOTP: (otp: string) => void;
}

export default function ChangeEmailModal({
  isOpen,
  onClose,
  step,
  setStep,
  newEmail,
  setNewEmail,
  timer,
  handleNextStep,
  handleResendCode,
  handleVerifyOTP,
}: ChangeEmailModalProps) {
  const t = useTranslations('profileForm');
  const [otp, setOtp] = useState('');

  if (!isOpen) {
    return null;
  }

  const handleClose = () => {
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close modal"
        onClick={handleClose}
        className="absolute inset-0 bg-bg-overlay"
      />

      <div className="relative z-10 w-full max-w-142 bg-bg-plain p-8">
        {step === 1 ? (
          <div className="space-y-6">
            <div className="mt-2">
              <div className="relative mb-8 flex w-full items-center justify-between">
                <div className="relative z-10 h-4 w-4 rotate-45 bg-bg-primary" />
                <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 border-t border-dashed border-border-primary" />
                <div className="relative z-10 h-4 w-4 rotate-45 border-2 border-border-primary bg-bg-plain" />
              </div>

              <h2 className="text-3xl font-bold text-text-plain">
                {t('changeEmail')}
              </h2>

              <p className="text-2xl font-bold text-text-primary">
                {t('enterEmail')}
              </p>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="new-email"
                className="text-sm font-medium text-text-default"
              >
                {t('email')}
              </label>

              <input
                id="new-email"
                type="email"
                placeholder={t('emailPlaceholder')}
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="w-full rounded-md border border-border-default bg-bg-plain p-3 text-sm text-text-plain outline-none placeholder:text-text-muted focus:border-border-primary"
              />
            </div>

            <div className="mt-8 border-t border-border-default pt-6">
              <button
                type="button"
                onClick={handleNextStep}
                className="flex w-full items-center justify-center gap-2 rounded-md bg-bg-primary py-4 font-semibold text-text-inverse transition-opacity hover:opacity-90"
              >
                <span className="text-sm tracking-wide">
                  {t('next')}
                </span>
                <ChevronRight
                  size={18}
                  strokeWidth={3}
                  className="rtl:rotate-180"
                />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="mt-2">
              <div className="relative mb-8 flex w-full items-center justify-between">
                <div className="relative z-10 h-4 w-4 rotate-45 bg-bg-primary" />
                <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 border-t border-solid border-border-primary" />
                <div className="relative z-10 h-4 w-4 rotate-45 bg-bg-primary" />
              </div>

              <h2 className="text-3xl font-bold text-text-plain">
                {t('changeEmail')}
              </h2>

              <div className="flex flex-col gap-2">
                <span className="text-2xl font-bold text-text-primary">
                  {t('verifyOtp')}
                </span>

                <p className="text-sm text-text-soft">
                  {t('otpP')}
                  <br />
                  <span className="font-semibold text-text-plain">
                    {newEmail}
                  </span>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="ms-1 cursor-pointer text-text-primary underline underline-offset-2"
                  >
                    {t('edit')}
                  </button>
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-y-1.5 rtl:direction-ltr">
              <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                <InputOTPGroup>
                  {Array.from({ length: 6 }, (_, index) => (
                    <InputOTPSlot key={index} index={index} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>

            <div className="text-center">
              <p className="mb-6 text-xs text-text-muted">
                {timer > 0 ? (
                  t('resendTimer', { s: timer })
                ) : (
                  <Button
                    type="button"
                    variant="link"
                    className="mt-7 ms-auto flex p-0 text-sm leading-none text-text-plain"
                    onClick={handleResendCode}
                  >
                    {t('resendCode')}
                  </Button>
                )}
              </p>

              <div className="border-t border-border-soft p-2">
                <button
                  type="button"
                  onClick={() => handleVerifyOTP(otp)}
                  className="w-full rounded-md bg-bg-primary py-3 font-semibold text-text-inverse transition-opacity hover:opacity-90"
                >
                  {t('verifyOtp')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
