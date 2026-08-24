'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

import { useOtpTimer } from '@/features/auth/hooks/otp-timer';
import {
  useConfirmEmailChange,
  useRequestEmailChange,
} from './use-change-email';

export function useChangeEmailFlow() {
  const t = useTranslations('profileForm.toast');
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [newEmail, setNewEmail] = useState('');
  const { timeLeft, resetTimer } = useOtpTimer();

  const {
    mutate: requestEmailChangeMutation,
    isPending: isRequesting,
  } = useRequestEmailChange();

  const {
    mutate: confirmEmailChangeMutation,
    isPending: isConfirming,
  } = useConfirmEmailChange();

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setStep(1);
  };

  const handleNextStep = () => {
    if (!newEmail.trim()) {
      toast.error(t('enterNewEmail'));
      return;
    }

    requestEmailChangeMutation(
      {
        newEmail: newEmail.trim(),
      },
      {
        onSuccess: (result) => {
          if (!result.status) {
            toast.error(result.message);
            return;
          }

          toast.success(t('verificationCodeSent'));
          setStep(2);
          resetTimer();
        },
      }
    );
  };

  const handleVerifyOTP = (otp: string) => {
    if (otp.length !== 6) {
      toast.error(t('enterSixDigits'));
      return;
    }

    confirmEmailChangeMutation(
      { code: otp },
      {
        onSuccess: (result) => {
          if (!result.status) {
            toast.error(result.message);
            return;
          }

          toast.success(t('emailUpdated'));

          close();
          setNewEmail('');
        },
      }
    );
  };

  const handleResendCode = () => {
    handleNextStep();
  };

  return {
    isOpen,
    open,
    close,

    step,
    setStep,

    newEmail,
    setNewEmail,

    timer: timeLeft,

    isRequesting,
    isConfirming,

    handleNextStep,
    handleVerifyOTP,
    handleResendCode,
  };
}
