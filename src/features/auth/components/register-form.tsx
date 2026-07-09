'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { ArrowRight, MoveRightIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import {
  confirmEmailVerification,
  verifyEmail,
} from '../apis/register-action';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/shared/components/ui/input-otp';
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select,
} from '@/shared/components/ui/select';
import {
  FieldError,
  Field,
  FieldGroup,
  FieldLabel,
} from '@/shared/components/ui/field';
import { useRegister } from '../hooks/register-hook';
import { useOtpTimer } from '../hooks/otp-timer';
import { PhoneInput } from '@/shared/components/ui/input-phone';
import { PasswordInput } from '@/shared/components/ui/input-password';

export default function Registerform() {
  const t = useTranslations('register');
  const translateError = (key?: string) =>
    key ? t(`errors.${key}` as Parameters<typeof t>[0]) : '';
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const step = Number(searchParams.get('step')) || 1;
  const emailFromUrl = searchParams.get('email') ?? '';
  const { timeLeft, resetTimer, canResend } = useOtpTimer();
  const {
    control,
    handleSubmit,
    register,
    mutate,
    errors,
    isPending,
    trigger,
    setValue,
    watch,
    getValues,
    formState,
  } = useRegister();

  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    if (emailFromUrl) {
      setValue('email', emailFromUrl);
    }
  }, [emailFromUrl, setValue]);

  const goToStep = (nextStep: number, email?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('step', String(nextStep));
    if (email) {
      params.set('email', email);
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleStep1 = async () => {
    const valid = await trigger('email');
    if (!valid) {
      return;
    }

    const email = watch('email');
    setIsVerifying(true);
    try {
      const response = await verifyEmail(email);
      if (response.status === true) {
        toast.success(response.message);
        setValue('email', email);
        resetTimer();
        goToStep(2, email);
      } else {
        toast.error(response.message);
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleStep2 = async () => {
    const email = emailFromUrl || watch('email');

    if (!otp || otp.length !== 6) {
      toast.error(t('otp.invalid'));
      return;
    }

    setIsVerifying(true);
    try {
      const response = await confirmEmailVerification({ email, otp });
      if (response.status === true) {
        toast.success(response.message);
        setValue('email', email);
        goToStep(3, email);
      } else {
        toast.error(response.message);
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    const email = emailFromUrl || watch('email');
    resetTimer();
    setIsVerifying(true);
    try {
      const response = await verifyEmail(email);
      if (response.status === true) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleNext = async () => {
    const valid = await trigger([
      'firstName',
      'lastName',
      'username',
      'phone',
      'gender',
    ]);
    if (valid) {
      goToStep(4, emailFromUrl || watch('email'));
    }
  };

  const onFinalSubmit = handleSubmit(
    (data) => {
      mutate({
        ...data,
        email: emailFromUrl || data.email,
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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      return handleStep1();
    }
    if (step === 2) {
      return handleStep2();
    }
    if (step === 4) {
      return onFinalSubmit(e);
    }
  };

  const isLoading =
    isVerifying || isPending || formState.isSubmitting;

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        {step === 1 && (
          <div className="gap-y-1.5 flex flex-col">
            <Label htmlFor="email">{t('email')}</Label>
            <Input
              id="email"
              placeholder={t('email')}
              {...register('email')}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="gap-y-1.5 flex flex-col items-center">
            <InputOTP maxLength={6} value={otp} onChange={setOtp}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            {!canResend ? (
              <p className="text-sm text-text-muted mt-2">
                {t('otp.resendTimer', { s: timeLeft })}
              </p>
            ) : (
              <Button
                type="button"
                variant={'link'}
                className="p-0 ms-auto text-sm text-text-plain leading-none mt-7"
                onClick={handleResend}
              >
                {t('otp.resend')}
              </Button>
            )}
          </div>
        )}

        {step === 3 && (
          <FieldGroup className="gap-4">
            <div className="flex flex-row gap-4">
              <Field className="flex-1">
                <FieldLabel>{t('firstName')}*</FieldLabel>
                <Input
                  placeholder={t('fnPlaceholder')}
                  {...register('firstName')}
                />
                {errors.firstName && (
                  <FieldError
                    errors={[{ message: errors.firstName.message }]}
                  />
                )}
              </Field>

              <Field className="flex-1">
                <FieldLabel>{t('lastName')}*</FieldLabel>
                <Input
                  placeholder={t('lnPlaceholder')}
                  {...register('lastName')}
                />
                {errors.lastName && (
                  <FieldError
                    errors={[{ message: errors.lastName.message }]}
                  />
                )}
              </Field>
            </div>

            <Field>
              <FieldLabel>{t('username')}*</FieldLabel>
              <Input
                placeholder={t('usernamePlaceholder')}
                {...register('username')}
              />
              {errors.username && (
                <FieldError
                  errors={[{ message: errors.username.message }]}
                />
              )}
            </Field>

            <Field>
              <FieldLabel>{t('phone')}</FieldLabel>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <PhoneInput
                    placeholder={t('phonePlaceholder')}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.phone && (
                <FieldError
                  errors={[{ message: errors.phone.message }]}
                />
              )}
            </Field>

            <Field>
              <FieldLabel>{t('gender')}</FieldLabel>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? null}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={t('genderPlaceholder')}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MALE">
                        {t('male')}
                      </SelectItem>
                      <SelectItem value="FEMALE">
                        {t('female')}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.gender && (
                <FieldError
                  errors={[
                    {
                      message: translateError(errors.gender.message),
                    },
                  ]}
                />
              )}
            </Field>

            <Button
              type="button"
              className="w-full mt-4"
              onClick={handleNext}
            >
              {t('next')}{' '}
              <ArrowRight size={18} className="rtl:rotate-180" />
            </Button>
            <div className="w-full border-b border-border-soft mt-8 mb-3" />
          </FieldGroup>
        )}

        {step === 4 && (
          <FieldGroup className="gap-4">
            <Field>
              <FieldLabel>{t('password')}*</FieldLabel>
              <PasswordInput
                placeholder={t('passPlaceholder')}
                {...register('password')}
              />
              {errors.password && (
                <FieldError
                  errors={[
                    {
                      message: translateError(
                        errors.password.message
                      ),
                    },
                  ]}
                />
              )}
            </Field>

            <Field>
              <FieldLabel>{t('confirmPassword')}*</FieldLabel>
              <PasswordInput
                placeholder={t('confirmPassPlaceholder')}
                {...register('confirmPassword')}
              />
              {errors.confirmPassword && (
                <FieldError
                  errors={[
                    {
                      message: translateError(
                        errors.confirmPassword.message
                      ),
                    },
                  ]}
                />
              )}
            </Field>
          </FieldGroup>
        )}

        {step !== 3 && (
          <Button
            className="w-full mt-9 mb-9 font-medium"
            variant={'default'}
            loading={isLoading}
            disabled={step === 1 && !watch('email')}
            type="submit"
          >
            {step === 2 ? (
              t('otp.submitButton')
            ) : step === 4 ? (
              t('submit')
            ) : (
              <>
                {t('next')}
                <MoveRightIcon className="size-[18px] ms-1 rtl:rotate-180" />
              </>
            )}
          </Button>
        )}
      </form>
    </div>
  );
}
