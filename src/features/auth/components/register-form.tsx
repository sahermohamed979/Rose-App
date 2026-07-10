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

interface RegisterFormProps {
  currentStep: number;
  setStep: (step: number) => void;
}
export default function Registerform() {
  const [step, setStep] = useState(1);
  const [part, setPart] = useState(3);
  const [email, setEmail] = useState('');
  const t = useTranslations('register');
  const translateError = (key?: string) =>
    key ? t(`errors.${key}` as Parameters<typeof t>[0]) : '';
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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

  const handleStep1 = async () => {
    const valid = await trigger('email');
    if (!valid) {
      return;
    }

    const email = getValues('email');

    setIsVerifying(true);
    try {
      const response = await verifyEmail(email);
      if (response.status === true) {
        toast.success(response.message);
        resetTimer();
        setStep(2);
      } else {
        toast.error(response.message);
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleStep2 = async () => {
    const email = getValues('email');

    if (!email) {
      toast.error(t('errors.emailMissing'));
      return;
    }

    if (!otp || otp.length !== 6) {
      toast.error(t('otp.invalid'));
      return;
    }

    setIsVerifying(true);
    try {
      const response = await confirmEmailVerification({ email, otp });

      if (response.status === true) {
        toast.success(response.message);
        // setValue مش محتاجة هنا لأن الإيميل هو هو اللي في الفورم
        setStep(3);
      } else {
        toast.error(response.message);
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      toast.error(t('errors.emailMissing'));
      return;
    }

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
      setStep(4);
      setPart(4);
    } else {
      toast.error(t('errors.fillAllFields'));
    }
  };
  const onFinalSubmit = handleSubmit(
    (data) => {
      mutate({
        ...data,

        email: email,
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
    console.log('Form submitted at step:', step);
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
              {/* first name */}
              <Controller
                name="firstName"
                control={control}
                render={({ field, fieldState }) => (
                  <Field
                    className="flex-1"
                    data-invalid={fieldState.invalid}
                  >
                    <FieldLabel htmlFor="firstName">
                      {t('firstName')}{' '}
                      <span className="text-text-danger">*</span>
                    </FieldLabel>
                    <Input
                      aria-invalid={fieldState.invalid}
                      id="firstName"
                      placeholder={t('fnPlaceholder')}
                      {...register('firstName')}
                    />
                    {fieldState.invalid && (
                      <FieldError
                        errors={[
                          fieldState.error ?? errors.firstName,
                        ]}
                      />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="lastName"
                control={control}
                render={({ field, fieldState }) => (
                  <Field
                    className="flex-1"
                    data-invalid={fieldState.invalid}
                  >
                    <FieldLabel htmlFor="lastName">
                      {t('lastName')}{' '}
                      <span className="text-text-danger">*</span>
                    </FieldLabel>
                    <Input
                      id="lastName"
                      aria-invalid={fieldState.invalid}
                      placeholder={t('lnPlaceholder')}
                      {...register('lastName')}
                    />
                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error ?? errors.lastName]}
                      />
                    )}
                  </Field>
                )}
              />
            </div>

            <Controller
              name="username"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="username">
                    {t('username')}
                    <span className="text-text-danger">*</span>
                  </FieldLabel>
                  <Input
                    id="username"
                    aria-invalid={fieldState.invalid}
                    placeholder={t('usernamePlaceholder')}
                    {...register('username')}
                  />
                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error ?? errors.username]}
                    />
                  )}
                </Field>
              )}
            />
            <Controller
              name="phone"
              control={control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="gap-1"
                >
                  <FieldLabel htmlFor="phone">
                    {t('phone')}
                  </FieldLabel>

                  <PhoneInput
                    id="phone"
                    aria-invalid={fieldState.invalid}
                    placeholder={t('phonePlaceholder')}
                    {...register('phone')}
                  />
                  {/* </div> */}

                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error ?? errors.phone]}
                    />
                  )}
                </Field>
              )}
            />

            {/* gender */}
            <Controller
              name="gender"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="gender">
                    {t('gender')}
                  </FieldLabel>

                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? ''}
                  >
                    <SelectTrigger
                      id="gender"
                      aria-invalid={fieldState.invalid}
                    >
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

                  {/* الـ Error مكانه هنا، جوه الـ render */}
                  {fieldState.error && (
                    <FieldError
                      errors={[fieldState.error ?? errors.gender]}
                    />
                  )}
                </Field>
              )}
            />

            <Button
              type="button"
              className="w-full mt-4"
              onClick={handleNext}
            >
              {t('next')}{' '}
              <ArrowRight size={18} className="rtl:rotate-180" />
            </Button>
          </FieldGroup>
        )}

        {step === 4 && (
          <FieldGroup className="gap-4">
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">
                    {t('password')}
                    <span className="text-text-danger">*</span>
                  </FieldLabel>
                  <PasswordInput
                    id="password"
                    aria-invalid={fieldState.invalid}
                    placeholder={t('passPlaceholder')}
                    {...register('password')}
                  />
                  {errors.password && (
                    <FieldError
                      errors={[fieldState.error ?? errors.password]}
                    />
                  )}
                </Field>
              )}
            />

            <Controller
              name="confirmPassword"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="confirmPassword">
                    {t('confirmPassword')}
                    <span className="text-text-danger">*</span>
                  </FieldLabel>
                  <PasswordInput
                    id="confirmPassword"
                    aria-invalid={fieldState.invalid}
                    placeholder={t('confirmPassPlaceholder')}
                    {...register('confirmPassword')}
                  />
                  {errors.confirmPassword && (
                    <FieldError
                      errors={[
                        fieldState.error ?? errors.confirmPassword,
                      ]}
                    />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        )}

        {step !== 3 && (
          <Button
            className="w-full mt-9 mb-9 font-medium"
            variant={'default'}
            loading={isLoading}
            disabled={isLoading || (step === 1 && !formState.isValid)}
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
