'use client';
import { Button } from '@/shared/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { ArrowRight } from 'lucide-react';
import React from 'react';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormTrigger,
} from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { PhoneInput } from '@/shared/components/ui/input-phone';
import { toast } from 'sonner';
import { RegisterSchemaType } from '../types/register-types';

interface userInfoProps {
  currentStep: number;
  setStep: (step: number) => void;
  control: Control<RegisterSchemaType>;
  errors: FieldErrors<RegisterSchemaType>;
  trigger: UseFormTrigger<RegisterSchemaType>;
}
export default function UserInfoStep({
  currentStep,
  setStep,
  control,
  errors,
  trigger,
}: userInfoProps) {
  const t = useTranslations('register');

  // Personal Info Validation (Transition from Step 3 to 4)
  const handleNext = async () => {
    const valid = await trigger([
      'firstName',
      'lastName',
      'username',
      'phone',
      'gender',
    ]);

    if (valid) {
      setStep(4);
    } else {
      toast.error(t('errors.fillAllFields'));
    }
  };
  return (
    <div>
      {currentStep === 3 && (
        <FieldGroup className="gap-4">
          <div className="flex flex-row gap-4">
            {/* first name */}
            <Controller
              name="firstName"
              control={control}
              render={({ field, fieldState }) => (
                <Field
                  className="flex-1"
                  data-invalid={fieldState.invalid}
                >
                  <FieldLabel htmlFor="firstName">
                    {t('firstName')}{' '}
                    <span className="text-text-danger">*</span>
                  </FieldLabel>
                  <Input
                    aria-invalid={fieldState.invalid}
                    id="firstName"
                    placeholder={t('fnPlaceholder')}
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error ?? errors.firstName]}
                    />
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
                    {t('lastName')}{' '}
                    <span className="text-text-danger">*</span>
                  </FieldLabel>
                  <Input
                    id="lastName"
                    aria-invalid={fieldState.invalid}
                    placeholder={t('lnPlaceholder')}
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error ?? errors.lastName]}
                    />
                  )}
                </Field>
              )}
            />
          </div>

          <Controller
            name="username"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="username">
                  {t('username')}
                  <span className="text-text-danger">*</span>
                </FieldLabel>
                <Input
                  id="username"
                  aria-invalid={fieldState.invalid}
                  placeholder={t('usernamePlaceholder')}
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error ?? errors.username]}
                  />
                )}
              </Field>
            )}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="gap-1"
              >
                <FieldLabel htmlFor="phone">{t('phone')}</FieldLabel>

                <PhoneInput
                  id="phone"
                  aria-invalid={fieldState.invalid}
                  placeholder={t('phonePlaceholder')}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                />
                {/* </div> */}

                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error ?? errors.phone]}
                  />
                )}
              </Field>
            )}
          />

          {/* gender */}
          <Controller
            name="gender"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="gender">
                  {t('gender')}
                </FieldLabel>

                <Select
                  onValueChange={field.onChange}
                  value={field.value ?? ''}
                >
                  <SelectTrigger
                    id="gender"
                    aria-invalid={fieldState.invalid}
                  >
                    <SelectValue
                      placeholder={t('genderPlaceholder')}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MALE">{t('male')}</SelectItem>
                    <SelectItem value="FEMALE">
                      {t('female')}
                    </SelectItem>
                  </SelectContent>
                </Select>

                {/* الـ Error مكانه هنا، جوه الـ render */}
                {fieldState.error && (
                  <FieldError
                    errors={[fieldState.error ?? errors.gender]}
                  />
                )}
              </Field>
            )}
          />

          <Button
            type="button"
            className="w-full mt-4"
            onClick={handleNext}
          >
            {t('next')}{' '}
            <ArrowRight size={18} className="rtl:rotate-180" />
          </Button>
        </FieldGroup>
      )}
    </div>
  );
}
