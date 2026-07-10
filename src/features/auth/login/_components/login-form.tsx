'use client';

import Link from 'next/link';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  LoginFormValues,
  loginSchema,
} from '../_schema/login.schema';
import useLogin from '../_hooks/use-login';

import { Input } from '@/shared/components/ui/input';
import { PasswordInput } from '@/shared/components/ui/input-password';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Button } from '@/shared/components/ui/button';
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from '@/shared/components/ui/field';
import { useTranslations } from 'next-intl';

export default function LoginForm() {
  const t = useTranslations('login');

  const { login, isPending, apiError } = useLogin();

  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    mode: 'onBlur',
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<LoginFormValues> = (values) => {
    login(values);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, (errs) =>
        console.error(
          '[Zod validation errors - submit blocked]',
          errs
        )
      )}
      className="flex flex-col gap-5"
    >
      {/* Email */}
      <Field data-invalid={!!errors.email}>
        <FieldLabel htmlFor="email">{t('email')}</FieldLabel>
        <FieldContent>
          <Input
            id="email"
            {...register('email')}
            type="email"
            autoComplete="email"
            placeholder={t('email-placeholder')}
            invalid={!!errors.email}
          />
        </FieldContent>
        <FieldError errors={[errors.email]} />
      </Field>

      {/* Password */}
      <Field data-invalid={!!errors.password}>
        <FieldLabel htmlFor="password">{t('password')}</FieldLabel>
        <FieldContent>
          <PasswordInput
            id="password"
            {...register('password')}
            autoComplete="current-password"
            invalid={!!errors.password}
          />
        </FieldContent>
        <div
          className={`flex items-start justify-between ${errors.password ? 'mb-1' : ''}`}
        >
          <FieldError errors={[errors.password]} />
          <Link
            href="/forget-password"
            className="text-xs text-primary underline-offset-4 hover:underline ltr:ml-auto rtl:mr-auto mt-1"
          >
            {t('forgot-password')}
          </Link>
        </div>
      </Field>

      {/* Remember me */}
      <Controller
        name="rememberMe"
        control={control}
        render={({ field }) => (
          <Field
            orientation="horizontal"
            className="items-center gap-2 mt-1"
          >
            <FieldContent className="flex-none">
              <Checkbox
                id="rememberMe"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FieldContent>
            <FieldLabel
              htmlFor="rememberMe"
              className="font-normal cursor-pointer"
            >
              {t('remember-me')}
            </FieldLabel>
          </Field>
        )}
      />

      {/* API Error */}
      {apiError && (
        <div className="p-3 mt-2 rounded-lg bg-bg-danger text-text-inverse text-sm border border-border-danger">
          {apiError}
        </div>
      )}

      {/* Submit */}
      <Button
        type="submit"
        loading={isPending}
        className="w-full mt-2"
      >
        {t('login')}
      </Button>
    </form>
  );
}
