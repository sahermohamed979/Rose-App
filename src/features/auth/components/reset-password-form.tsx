'use client';
import { Controller } from 'react-hook-form';
import {
  FieldLabel,
  Field,
  FieldError,
  FieldGroup,
} from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { Eye, EyeOff, Loader } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import useRestPassword from '../hooks/reset-password-hook';
import { useState } from 'react';

export default function ResetPasswordForm() {
  // TRANSLATIONS
  const t = useTranslations();
  // PARAMS to get the token form url
  const params = useParams();
  const token = params.token as string;
  // STATE for showing password or not
  const [showPassword, setShowPassword] = useState(false);
  // HOOK to get the control, handleSubmit, errors, onSubmit, isPending
  const { control, handleSubmit, errors, onSubmit, isPending } =
    useRestPassword(token);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/*  enter new password */}
      <FieldGroup className="gap-2">
        <Controller
          name="newPassword"
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
                {t('forgotPw.step3.passwordLabel')}
              </FieldLabel>
              <div className="relative">
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="********"
                  autoComplete="false"
                  type={showPassword ? 'text' : 'password'}
                  required
                />
                <span
                  className="absolute top-3 ltr:right-3 rtl:left-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Eye size={20} className="text-gray-400 " />
                  ) : (
                    <EyeOff size={20} className="text-gray-400 " />
                  )}
                </span>
              </div>
              {/* error field */}
              {fieldState.invalid && (
                <FieldError
                  errors={[fieldState.error ?? errors.newPassword]}
                />
              )}
            </Field>
          )}
        />

        {/* confirm password */}
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="gap-1 "
            >
              <FieldLabel
                htmlFor={field.name}
                className="font-medium text-sm"
              >
                {t('forgotPw.step3.confirmPasswordLabel')}
              </FieldLabel>
              <div className="relative">
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="********"
                  autoComplete="false"
                  type={showPassword ? 'text' : 'password'}
                  required
                />
                <span
                  className="absolute top-3 ltr:right-3 rtl:left-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Eye size={20} className="text-gray-400 " />
                  ) : (
                    <EyeOff size={20} className="text-gray-400 " />
                  )}
                </span>
              </div>
              {/* error field */}
              {fieldState.invalid && (
                <FieldError
                  errors={[
                    fieldState.error ?? errors.confirmPassword,
                  ]}
                />
              )}
            </Field>
          )}
        />
        {/* submit button */}
        <Button
          className={`w-full mt-8.5 bg-maroon-600`}
          type="submit"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <span> {t('forgotPw.step3.submit')}...</span>
              <Loader className="animate-spin" size={20} />
            </>
          ) : (
            t('forgotPw.step3.submit')
          )}
        </Button>
      </FieldGroup>
    </form>
  );
}
