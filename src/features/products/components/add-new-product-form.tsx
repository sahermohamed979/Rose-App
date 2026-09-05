'use client';

import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import type {
  OccasionType,
  ProductCategory,
} from '@/shared/lib/types/product-types';
import { Button } from '@/shared/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import { FileInput } from '@/shared/components/ui/input-upload-file';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/shared/components/ui/combobox';
import { Textarea } from '@/shared/components/ui/textarea';
import {
  getAddProductSchema,
  type AddNewProductFormValues,
} from '../schemas/add-product-schema';
import DiscountedPriceField from './discounted-price-field';
import { useAddProduct } from '../hooks/use-add-product';

export type { AddNewProductFormValues } from '../schemas/add-product-schema';

interface AddNewProductFormProps {
  categories: ProductCategory[];
  occasions: OccasionType[];
}

export default function AddNewProductForm({
  categories,
  occasions,
}: AddNewProductFormProps) {
  // Translations
  const t = useTranslations('dashboard.products');

  // Validation
  const schema = getAddProductSchema(t);

  // Form
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AddNewProductFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      discount: 0,
      quantity: 0,
      category: '',
      occasion: '',
    },
  });

  // Functions
  const { mutate: addProduct, isPending } = useAddProduct();
  const handleFormSubmit = (values: AddNewProductFormValues) => {
    addProduct(values);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col gap-6  md:p-0"
    >
      <FieldGroup>
        <Field data-invalid={!!errors.title}>
          <FieldLabel
            htmlFor="title"
            className="after:text-text-danger after:content-['*']"
          >
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
            className="after:text-text-danger after:content-['*']"
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
              className="after:text-text-danger after:content-['*']"
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
              className="after:text-text-danger after:content-['*']"
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
              className="after:text-text-danger after:content-['*']"
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
              className="after:text-text-danger after:content-['*']"
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
                  className="after:text-text-danger after:content-['*']"
                >
                  {t('category')}
                </FieldLabel>
                <Combobox
                  items={categories}
                  value={
                    categories.find(
                      (category) => category.id === field.value
                    ) ?? null
                  }
                  onValueChange={(category) =>
                    field.onChange(category?.id ?? '')
                  }
                  itemToStringLabel={(category) => category.title}
                  itemToStringValue={(category) => category.id}
                >
                  <ComboboxInput
                    id="category"
                    onBlur={field.onBlur}
                    aria-invalid={fieldState.invalid}
                    placeholder={t('selectOption')}
                    className="w-full"
                  />
                  <ComboboxContent>
                    <ComboboxEmpty>{t('noOptions')}</ComboboxEmpty>
                    <ComboboxList>
                      {(category) => (
                        <ComboboxItem
                          key={category.id}
                          value={category}
                        >
                          {category.title}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
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
                  className="after:text-text-danger after:content-['*']"
                >
                  {t('occasion')}
                </FieldLabel>
                <Combobox
                  items={occasions}
                  value={
                    occasions.find(
                      (occasion) => occasion.id === field.value
                    ) ?? null
                  }
                  onValueChange={(occasion) =>
                    field.onChange(occasion?.id ?? '')
                  }
                  itemToStringLabel={(occasion) => occasion.title}
                  itemToStringValue={(occasion) => occasion.id}
                >
                  <ComboboxInput
                    id="occasion"
                    onBlur={field.onBlur}
                    aria-invalid={fieldState.invalid}
                    placeholder={t('selectOption')}
                    className="w-full"
                  />
                  <ComboboxContent>
                    <ComboboxEmpty>{t('noOptions')}</ComboboxEmpty>
                    <ComboboxList>
                      {(occasion) => (
                        <ComboboxItem
                          key={occasion.id}
                          value={occasion}
                        >
                          {occasion.title}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
        </div>
      </FieldGroup>

      <Button type="submit" className="w-full " disabled={isPending}>
        {isPending ? t('addingProduct') : t('addProduct')}
      </Button>
    </form>
  );
}
