'use client';

import { Field, FieldLabel } from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import { PhoneInput } from '@/shared/components/ui/input-phone';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { Pencil } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Controller, Control } from 'react-hook-form';

import { UserProfileFormValues } from '../schemas/profile-schema';

interface ProfileFieldsProps {
  control: Control<UserProfileFormValues>;
  onChangeEmail: () => void;
}

export default function ProfileFields({
  control,
  onChangeEmail,
}: ProfileFieldsProps) {
  const t = useTranslations('profileForm.fields');

  return (
    <div className="space-y-4">
      {/* First Name / Last Name */}

      <div className="flex flex-row gap-4">
        <Controller
          name="firstName"
          control={control}
          render={({ field, fieldState }) => (
            <Field
              className="flex-1"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel htmlFor="firstName">
                {t('firstName')}
              </FieldLabel>

              <Input
                id="firstName"
                aria-invalid={fieldState.invalid}
                {...field}
              />
              {fieldState.error && (
                <p className="text-sm text-red-500">
                  {fieldState.error.message}
                </p>
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
                {t('lastName')}
              </FieldLabel>

              <Input
                id="lastName"
                aria-invalid={fieldState.invalid}
                {...field}
              />
              {fieldState.error && (
                <p className="text-sm text-red-500">
                  {fieldState.error.message}
                </p>
              )}
            </Field>
          )}
        />
      </div>

      {/* Email */}

      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="email" className="text-text-muted">
                {t('email')}
              </FieldLabel>

              <button
                type="button"
                onClick={onChangeEmail}
                className="flex items-center gap-1 text-xs font-semibold text-text-primary hover:underline"
              >
                <Pencil size={12} strokeWidth={2.5} />
                {t('change')}
              </button>
            </div>

            <Input
              disabled
              id="email"
              className="bg-bg-muted"
              {...field}
            />
          </Field>
        )}
      />

      {/* Phone */}

      <Controller
        name="phone"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="gap-1">
            <FieldLabel htmlFor="phone">{t('phone')}</FieldLabel>

            <PhoneInput
              id="phone"
              placeholder="01012345678"
              aria-invalid={fieldState.invalid}
              value={field.value ?? ''}
              onChange={field.onChange}
              onBlur={field.onBlur}
              name={field.name}
            />
            {fieldState.error && (
              <p className="text-sm text-red-500">
                {fieldState.error.message}
              </p>
            )}
          </Field>
        )}
      />

      {/* Gender */}

      <Controller
        name="gender"
        control={control}
        render={({ field, fieldState }) => (
          <Field className="flex-1" data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="gender" className="text-text-muted">
              {t('gender')}
            </FieldLabel>

            <Select
              disabled
              value={field.value ?? ''}
              onValueChange={field.onChange}
            >
              <SelectTrigger id="gender">
                <SelectValue placeholder={t('genderPlaceholder')} />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="MALE">{t('male')}</SelectItem>

                <SelectItem value="FEMALE">{t('female')}</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        )}
      />
    </div>
  );
}
