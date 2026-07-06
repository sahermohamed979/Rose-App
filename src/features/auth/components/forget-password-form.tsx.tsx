'use client';
import { Link } from '@/i18n/navigation';
import { Button } from '@/shared/components/ui/button';
import {
  Field,
  FieldError,
  FieldLabel,
} from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import { LoaderCircle, MoveRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Controller } from 'react-hook-form';
import ForgetTittles from './forget-password-tittle';
import { useForgetPassword } from '../hooks/forget-password-hook';

export default function ForgetPasswordForm() {
  // Translation
  const t = useTranslations();

  //  custom hook
  const {
    control,
    handleSubmit,
    step,
    setStep,
    email,
    isPending,
    onSubmitEmail,
    errors,
  } = useForgetPassword();

  return (
    <div className="">
      {/* Step 1: send   email  */}
      {step === 1 && (
        <>
          <ForgetTittles
            title={t('forgotPw.step1.title')}
            description={t('forgotPw.step1.subtitle')}
          />
          <form onSubmit={handleSubmit(onSubmitEmail)}>
            {/* input email */}
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="gap-1 mt-6"
                >
                  <FieldLabel
                    htmlFor={field.name}
                    className="font-medium text-sm"
                  >
                    {t('forgotPw.step1.emailLabel')}
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="user@example.com"
                    autoComplete="true"
                    type="email"
                    required
                  />
                  {/* error field */}
                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error ?? errors.email]}
                    />
                  )}
                </Field>
              )}
            />
            <Button
              className={`w-full mt-9 `}
              type="submit"
              disabled={isPending}
            >
              {t('forgotPw.step1.next')}
              {isPending ? (
                <LoaderCircle className="animate-spin" size={18} />
              ) : (
                <MoveRight className="rtl:rotate-y-180 " size={18} />
              )}
            </Button>
          </form>
          {/* hint section */}
          <div className="text-center text-sm  border-t mt-9">
            <span className="mt-6 inline-block font-medium text-text-plain ">
              {t('forgotPw.step1.hint')}{' '}
            </span>
            <Link
              href="/register"
              className=" font-bold text-text-primary "
            >
              {t('forgotPw.step1.register')}
            </Link>
          </div>
        </>
      )}

      {/* Step 2: reset password  */}
      {step === 2 && (
        <div className="flex-col space-y-3   ">
          <div className="flex items-center gap-3">
            <ForgetTittles
              title={t('forgotPw.step2.title')}
              description={t('forgotPw.step2.subtitle')}
              email={email}
              icon={true}
              action={() => setStep(1)}
            />
          </div>
          <p className=" text-base text-text-plain  ">
            {t('forgotPw.step2.description')}
          </p>
          <span className="   text-base ">
            {t('forgotPw.step2.description2')}
          </span>
          <div className="text-center text-sm  border-t mt-9">
            <span className=" text-sm mt-6 inline-block font-medium text-text-plain   ">
              {t('forgotPw.step2.help')}
              <Link href={'/contact'} className="text-maroon-700">
                {t('forgotPw.step2.contact')}
              </Link>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
