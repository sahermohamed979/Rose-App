'use client';

import { Controller } from 'react-hook-form';
import { useTranslations } from 'next-intl';

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import { PhoneInput } from '@/shared/components/ui/input-phone';
import { IAddress } from '@/shared/lib/types/adresses.type';
import { useAddress } from '../hooks/address-hook';
import { AddressFormFields } from '../schemas/address-form-schema';

export const ADDRESS_FORM_ID = 'address-form';

interface AddressFormProps {
  initialData?: Partial<IAddress>;
  onNext: (data: AddressFormFields) => void;
}

export default function AddressForm({
  initialData,
  onNext,
}: AddressFormProps) {
  // Translations
  const t = useTranslations('address');

  // Hooks
  const { control, handleSubmit } = useAddress({
    initialData,
  });

  // Functions
  const handleNext = (data: AddressFormFields) => {
    onNext(data);
  };

  return (
    <form
      id={ADDRESS_FORM_ID}
      onSubmit={handleSubmit(handleNext)}
      className="w-full flex flex-col"
    >
      <FieldGroup className="gap-4">
        <div className="flex flex-row gap-4 flex-wrap">
          {/* Title */}
          <Controller
            name="title"
            control={control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="gap-1 w-full"
              >
                <FieldLabel htmlFor="title">{t('title')}</FieldLabel>
                <Input
                  id="title"
                  aria-invalid={fieldState.invalid}
                  placeholder={t('title')}
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* City */}
          <Controller
            name="city"
            control={control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="gap-1 w-full"
              >
                <FieldLabel htmlFor="city">{t('city')}</FieldLabel>
                <Input
                  id="city"
                  aria-invalid={fieldState.invalid}
                  placeholder={t('city')}
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Street */}
          <Controller
            name="street"
            control={control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="gap-1 w-full"
              >
                <FieldLabel htmlFor="street">
                  {t('details')}
                </FieldLabel>
                <Input
                  id="street"
                  aria-invalid={fieldState.invalid}
                  placeholder={t('details')}
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Phone */}
          <Controller
            name="phone"
            control={control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="gap-1 w-full"
              >
                <FieldLabel htmlFor="phone">{t('phone')}</FieldLabel>
                <PhoneInput
                  id="phone"
                  aria-invalid={fieldState.invalid}
                  placeholder={t('phone')}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
      </FieldGroup>
    </form>
  );
}
