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
  const t = useTranslations('ChangePasswordForm');

  // Change Password Schema
  const changePasswordSchema = useMemo(
    () => getChangePasswordSchema(t),
    [t]
  );

  // Form
  const {
    register,
    handleSubmit,
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
  const { mutate, isPending } = useChangePassword();

  const onSubmit = (data: ChangePasswordValues) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

      {/* Current Password */}
      <div className="space-y-2 border-b border-border-muted pb-4">
        <Label htmlFor="currentPassword">
          {t('labels.oldPassword')}
        </Label>

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
        <Label htmlFor="newPassword">{t('labels.newPassword')}</Label>

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
        <Label htmlFor="confirmPassword">
          {t('labels.confirmPassword')}
        </Label>

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
        <Button type="submit" disabled={isPending} className="w-1/4">
          {isPending ? t('buttons.submitting') : t('buttons.submit')}
        </Button>
      </div>
    </form>
  );
}
