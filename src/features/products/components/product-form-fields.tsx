'use client';

import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import {
  Controller,
  type Control,
  type FieldErrors,
  type UseFormRegister,
} from 'react-hook-form';

import type {
  OccasionType,
  ProductCategory,
} from '@/shared/lib/types/product-types';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import { FileInput } from '@/shared/components/ui/input-upload-file';
import { Textarea } from '@/shared/components/ui/textarea';
import type { AddNewProductFormValues } from '../schemas/add-product-schema';
import DiscountedPriceField from './discounted-price-field';
import ProductOptionCombobox from './product-option-combobox';

const REQUIRED_LABEL_CLASS =
  "after:text-text-danger after:content-['*']";

interface ProductFormFieldsProps {
  register: UseFormRegister<AddNewProductFormValues>;
  control: Control<AddNewProductFormValues>;
  errors: FieldErrors<AddNewProductFormValues>;
  categories: ProductCategory[];
  occasions: OccasionType[];
  isCoverRequired: boolean;
  coverPreview?: ReactNode;
  galleryPreview?: ReactNode;
}

export default function ProductFormFields({
  register,
  control,
  errors,
  categories,
  occasions,
  isCoverRequired,
  coverPreview,
  galleryPreview,
}: ProductFormFieldsProps) {
  // Translations
  const t = useTranslations('dashboard.products');

  return (
    <FieldGroup>
      <Field data-invalid={!!errors.title}>
        <FieldLabel htmlFor="title" className={REQUIRED_LABEL_CLASS}>
          {t('title')}
        </FieldLabel>
        <Input
          id="title"
          aria-invalid={!!errors.title}
          placeholder={t('titlePlaceholder')}
          {...register('title')}
        />
        <FieldError errors={[errors.title]} />
      </Field>

      <Field data-invalid={!!errors.description}>
        <FieldLabel
          htmlFor="description"
          className={REQUIRED_LABEL_CLASS}
        >
          {t('description')}
        </FieldLabel>
        <Textarea
          className="resize-none field-sizing-fixed"
          id="description"
          rows={7}
          aria-invalid={!!errors.description}
          placeholder={t('descriptionPlaceholder')}
          {...register('description')}
        />
        <FieldError errors={[errors.description]} />
      </Field>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Field data-invalid={!!errors.price}>
          <FieldLabel
            htmlFor="price"
            className={REQUIRED_LABEL_CLASS}
          >
            {t('price')}
          </FieldLabel>
          <Input
            id="price"
            type="number"
            min={0}
            step="0.01"
            aria-invalid={!!errors.price}
            placeholder={t('pricePlaceholder')}
            {...register('price', { valueAsNumber: true })}
          />
          <FieldError errors={[errors.price]} />
        </Field>

        <Field data-invalid={!!errors.discount}>
          <FieldLabel
            htmlFor="discount"
            className={REQUIRED_LABEL_CLASS}
          >
            {t('discount')}
          </FieldLabel>
          <Input
            id="discount"
            type="number"
            min={0}
            max={100}
            step="0.01"
            aria-invalid={!!errors.discount}
            placeholder={t('discountPlaceholder')}
            {...register('discount', { valueAsNumber: true })}
          />
          <FieldError errors={[errors.discount]} />
        </Field>
        <DiscountedPriceField control={control} />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
        <Field data-invalid={!!errors.quantity}>
          <FieldLabel
            htmlFor="quantity"
            className={REQUIRED_LABEL_CLASS}
          >
            {t('quantity')}
          </FieldLabel>
          <Input
            id="quantity"
            type="number"
            min={0}
            aria-invalid={!!errors.quantity}
            placeholder={t('quantityPlaceholder')}
            {...register('quantity', { valueAsNumber: true })}
          />
          <FieldError errors={[errors.quantity]} />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field data-invalid={!!errors.productCover}>
          <FieldLabel
            htmlFor="productCover"
            className={
              isCoverRequired ? REQUIRED_LABEL_CLASS : undefined
            }
          >
            {t('productCover')}
          </FieldLabel>
          <FileInput
            id="productCover"
            accept="image/*"
            aria-invalid={!!errors.productCover}
            {...register('productCover')}
          />
          <FieldError errors={[errors.productCover]} />
          {coverPreview}
        </Field>

        <Field data-invalid={!!errors.productGallery}>
          <FieldLabel htmlFor="productGallery">
            {t('productGallery')}
          </FieldLabel>
          <FileInput
            id="productGallery"
            accept="image/*"
            multiple
            aria-invalid={!!errors.productGallery}
            {...register('productGallery')}
          />
          <FieldError errors={[errors.productGallery]} />
          {galleryPreview}
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
        <Controller
          name="category"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor="category"
                className={REQUIRED_LABEL_CLASS}
              >
                {t('category')}
              </FieldLabel>
              <ProductOptionCombobox
                id="category"
                items={categories}
                value={field.value}
                onValueChange={field.onChange}
                onBlur={field.onBlur}
                invalid={fieldState.invalid}
                placeholder={t('selectOption')}
                emptyMessage={t('noOptions')}
              />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
        <Controller
          name="occasion"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor="occasion"
                className={REQUIRED_LABEL_CLASS}
              >
                {t('occasion')}
              </FieldLabel>
              <ProductOptionCombobox
                id="occasion"
                items={occasions}
                value={field.value}
                onValueChange={field.onChange}
                onBlur={field.onBlur}
                invalid={fieldState.invalid}
                placeholder={t('selectOption')}
                emptyMessage={t('noOptions')}
              />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />
      </div>
    </FieldGroup>
  );
}
