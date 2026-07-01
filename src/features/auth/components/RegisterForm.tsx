'use client';

import { ThemeToggle } from '@/shared/components/ThemeToggle';
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
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createRegisterSchema,
  type RegisterSchemaType,
} from '@/features/auth/schemas/registerSchema';
import Link from 'next/link';
import React from 'react';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '@/shared/components/LanguageSwitcher';
export default function RegisterForm() {
  const t = useTranslations('register');
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(createRegisterSchema(t)),
  });

  const onSubmit = async (data: RegisterSchemaType) => {
    console.log('Form Data:', data);
    // هنا هنربط بالـ API بتاع زميلك بعد ما يخلص
  };

  return (
    <div>
      <div className="flex flex-row ">
        <ThemeToggle />
        <LanguageSwitcher />
      </div>
      <form className="space-y-4 " onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row gap-4">
          <div className="space-y-1">
            <Label>{t('firstName')}</Label>
            <Input
              placeholder={t('fnPlaceholder')}
              {...register('firstName')}
              invalid={!!errors.firstName}
            />
            {errors.firstName && (
              <p className="text-text-danger text-xs">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Label>{t('lastName')}</Label>
            <Input
              placeholder={t('lnPlaceholder')}
              {...register('lastName')}
              invalid={!!errors.lastName}
            />
            {errors.lastName && (
              <p className="text-text-danger text-xs">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>
        <div className="space-y-1">
          <Label>{t('email')}</Label>
          <Input
            type="email"
            placeholder={t('emailPlaceholder')}
            {...register('email')}
            invalid={!!errors.email}
          />
          {errors.email && (
            <p className="text-text-danger text-xs">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label>{t('phone')}</Label>
          <PhoneInput
            placeholder={t('phonePlaceholder')}
            {...register('phone')}
            invalid={!!errors.phone}
          />
          {errors.phone && (
            <p className="text-text-danger text-xs">
              {errors.phone.message}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label>{t('gender')}</Label>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('genderPlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">{t('male')}</SelectItem>
                  <SelectItem value="female">
                    {t('female')}
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.gender && (
            <p className="text-text-danger text-xs">
              {t.has(`errors.${errors.gender.message}`)
                ? t(`errors.${errors.gender.message}`)
                : t('errors.genderRequired')}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label>{t('password')}</Label>
          <PasswordInput
            placeholder={t('passPlaceholder')}
            {...register('password')}
            invalid={!!errors.password}
          />
          {errors.password && (
            <p className="text-text-danger text-xs">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label>{t('confirmPassword')}</Label>
          <PasswordInput
            placeholder={t('confirmPassPlaceholder')}
            {...register('confirmPassword')}
            invalid={!!errors.confirmPassword}
          />
          {errors.confirmPassword && (
            <p className="text-text-danger text-xs">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-spinner animate-spin"></i>
              {t('loading')}
            </span>
          ) : (
            <span> {t('submit')}</span>
          )}
        </Button>
      </form>
      <p className="flex justify-center my-2">
        {t('emailInUse')}
        <Link href="/login" className="text-text-primary">
          {t('login')}
        </Link>
      </p>
    </div>
  );
}
