'use client';

import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Components

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { PasswordInput } from '@/shared/components/ui/input-password';
import { PhoneInput } from '@/shared/components/ui/input-phone';
import { Label } from '@/shared/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';

// Logic
import {
  registerSchema,
  type RegisterSchemaType,
} from '@/features/auth/schemas/registerSchema';
import { registerUser } from '../apis/authApi';

// Helper component for errors to keep JSX clean
const FormErrorMessage = ({ message }: { message?: string }) => {
  const t = useTranslations();
  if (!message) {
    return null;
  }
  return (
    <p className="text-text-danger text-xs">
      {t.has(`errors.${message}`)
        ? t(`errors.${message}`)
        : t(`errors.${message}`)}
    </p>
  );
};

export default function RegisterForm() {
  const router = useRouter();
  const t = useTranslations();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchemaType) => {
    try {
      await registerUser(data);
      router.push('/login');
    } catch (error: any) {
      if (
        error.message.includes('verify') ||
        error.message.includes('otp')
      ) {
        router.push('/forgot-password');
      } else {
        console.error('Registration error:', error.message);
      }
    }
  };

  return (
    <div>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Names Row */}
        <div className="flex flex-row gap-4">
          <div className="space-y-1">
            <Label>{t('register.firstName')}</Label>
            <Input
              placeholder={t('register.fnPlaceholder')}
              {...register('firstName')}
              invalid={!!errors.firstName}
            />
            <FormErrorMessage
              message={errors.firstName?.message as string}
            />
          </div>
          <div className="space-y-1">
            <Label>{t('register.lastName')}</Label>
            <Input
              placeholder={t('register.lnPlaceholder')}
              {...register('lastName')}
              invalid={!!errors.lastName}
            />
            <FormErrorMessage
              message={errors.lastName?.message as string}
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1">
          <Label>{t('register.email')}</Label>
          <Input
            type="email"
            placeholder={t('register.emailPlaceholder')}
            {...register('email')}
            invalid={!!errors.email}
          />
          <FormErrorMessage
            message={errors.email?.message as string}
          />
        </div>

        {/* Phone */}
        <div className="space-y-1">
          <Label>{t('register.phone')}</Label>
          <PhoneInput
            placeholder={t('register.phonePlaceholder')}
            {...register('phone')}
            invalid={!!errors.phone}
          />
          <FormErrorMessage
            message={errors.phone?.message as string}
          />
        </div>

        {/* Gender */}
        <div className="space-y-1">
          <Label>{t('register.gender')}</Label>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={t('register.genderPlaceholder')}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">
                    {t('register.male')}
                  </SelectItem>
                  <SelectItem value="female">
                    {t('register.female')}
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.gender && (
            <p className="text-text-danger text-xs">
              {/* التحقق من وجود الترجمة وعرضها */}

              {t.has(`errors.${errors.gender.message}`)
                ? t(`errors.${errors.gender.message}`)
                : t('errors.genderRequired')}
            </p>
          )}
        </div>

        {/* Password Fields */}
        <div className="space-y-1">
          <Label>{t('register.password')}</Label>
          <PasswordInput
            placeholder={t('register.passPlaceholder')}
            {...register('password')}
            invalid={!!errors.password}
          />
          <FormErrorMessage
            message={errors.password?.message as string}
          />
        </div>

        <div className="space-y-1">
          <Label>{t('register.confirmPassword')}</Label>
          <PasswordInput
            placeholder={t('register.confirmPassPlaceholder')}
            {...register('confirmPassword')}
            invalid={!!errors.confirmPassword}
          />
          <FormErrorMessage
            message={errors.confirmPassword?.message as string}
          />
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-spinner animate-spin"></i>{' '}
              {t('register.loading')}
            </span>
          ) : (
            <span>{t('register.submit')}</span>
          )}
        </Button>
      </form>

      <p className="flex justify-center my-2">
        {t('register.needHelp')}
        <span className="text-text-primary ms-1">
          {t('register.contactUs')}
        </span>
      </p>
    </div>
  );
}
