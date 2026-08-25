'use client';

import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { PasswordInput } from '@/shared/components/ui/input-password';
import { Label } from '@/shared/components/ui/label';
import { Button } from '@/shared/components/ui/button';
import {
  getChangePasswordSchema,
  type ChangePasswordValues,
} from '../schemas/change-password.schema';
import { useChangePassword } from '../hooks/use-change-password';

export default function ChangePasswordForm() {
  // Translations
  const t = useTranslations('changePassword');

  // Change Password Schema
  const changePasswordSchema = useMemo(
    () => getChangePasswordSchema(t),
    [t]
  );

  // Form
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  // Custom Hook
  const { mutate, isPending } = useChangePassword(setError);

  const onSubmit = (data: ChangePasswordValues) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold text-text-plain">
          {t('title')}
        </h2>
      </div>

      {/* Current Password */}
      <div className="space-y-2 border-b border-border-muted pb-4">
        <Label htmlFor="currentPassword">{t('current')}</Label>

        <PasswordInput
          id="currentPassword"
          placeholder="**********"
          {...register('currentPassword')}
        />

        {errors.currentPassword && (
          <p className="text-sm text-red-500">
            {errors.currentPassword.message}
          </p>
        )}
      </div>

      {/* New Password */}
      <div className="space-y-2">
        <Label htmlFor="newPassword">{t('new')}</Label>

        <PasswordInput
          id="newPassword"
          placeholder="**********"
          {...register('newPassword')}
        />

        {errors.newPassword && (
          <p className="text-sm text-red-500">
            {errors.newPassword.message}
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">{t('confirm')}</Label>

        <PasswordInput
          id="confirmPassword"
          placeholder="**********"
          {...register('confirmPassword')}
        />

        {errors.confirmPassword && (
          <p className="text-sm text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <Button type="submit" loading={isPending} className="w-1/4">
          {t('button')}
        </Button>
      </div>
    </form>
  );
}
