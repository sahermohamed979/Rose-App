'use client';
import { Controller, useForm } from 'react-hook-form';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import React from 'react';
import { PasswordInput } from '@/shared/components/ui/input-password';
import { Link } from '@/i18n/navigation';
import { Button } from '@/shared/components/ui/button';
import { useTranslations } from 'next-intl';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  getLoginSchema,
  LoginFormData,
} from '../schemas/login-schema';
import { useLoginMutation } from '../hooks/use-login';

export default function LoginForm() {
  // Translations
  const t = useTranslations('login');
  const tInput = useTranslations('input');

  // Validation
  const loginSchema = getLoginSchema(tInput);
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
      rememberMe: false,
    },
  });

  // Custom hook
  const { mutate: login, isPending, error } = useLoginMutation();

  // Submit
  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="mx-auto w-100 space-y-4 "
    >
      {/* Error */}
      {error && (
        <div className="p-3 text-sm text-center text-red-600 bg-red-50 rounded-md border border-red-200">
          {t('invalidCredentials')}
        </div>
      )}
      {/* EMAIL */}
      <FieldGroup>
        <Controller
          name="username"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>{t('email')}</FieldLabel>
              <Input placeholder="user@example.com" {...field} />
              {fieldState.error && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
      </FieldGroup>

      {/* PASSWORD */}
      <FieldGroup>
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>{t('password')}</FieldLabel>
              <PasswordInput
                placeholder="*********"
                {...field}
                autoComplete="current-password"
              />
              {fieldState.error && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
      </FieldGroup>

      {/* Link */}
      <div className="text-right rtl:text-left">
        <Link
          href="/forgot-password"
          className="text-text-primary text-sm font-semibold "
        >
          {t('forgotPassword')}
        </Link>
      </div>

      {/* Remember Me */}
      <Controller
        name="rememberMe"
        control={form.control}
        render={({ field }) => (
          <div className="flex items-center space-x-2 rtl:ml-2">
            <Checkbox
              id="rememberMe"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <label
              htmlFor="rememberMe"
              className="text-text-plain text-sm font-noraml cursor-pointer select-none"
            >
              {t('rememberMe')}
            </label>
          </div>
        )}
      />

      {/* Submit Button */}
      <Button
        type="submit"
        variant="default"
        className="w-full h-11"
        loading={isPending}
      >
        {t('button')}
      </Button>
    </form>
  );
}
