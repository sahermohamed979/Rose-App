import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/shared/components/ui/field';
import { useTranslations } from 'next-intl';
import React from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { PasswordInput } from '@/shared/components/ui/input-password';
import { RegisterSchemaType } from '../types/register-types';

interface passwordProps {
  currentStep: number;
  control: Control<RegisterSchemaType>;
  errors: FieldErrors<RegisterSchemaType>;
}

export default function PasswordStep({
  currentStep,
  errors,
  control,
}: passwordProps) {
  // transilations
  const t = useTranslations('register');

  return (
    <div>
      {currentStep === 4 && (
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
                  {...field}
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
                  {...field}
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
    </div>
  );
}
