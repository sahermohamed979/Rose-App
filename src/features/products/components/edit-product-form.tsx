'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ImageIcon } from 'lucide-react';

import type {
  IProduct,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { Textarea } from '@/shared/components/ui/textarea';
import {
  getEditProductSchema,
  type EditProductFormValues,
} from '../schemas/edit-product-schema';
import DiscountedPriceField from './discounted-price-field';
import { useEditProduct } from '../hooks/use-edit-product';
import ViewImageModal from '@/shared/components/view-image-modal';

export type { EditProductFormValues } from '../schemas/edit-product-schema';

interface EditProductFormProps {
  categories: ProductCategory[];
  occasions: OccasionType[];
  product: IProduct;
}

export default function EditProductForm({
  categories,
  occasions,
  product,
}: EditProductFormProps) {
  // Translations
  const t = useTranslations('dashboard.products');
  const gallery = product.gallery;

  // View-image modal open/close state
  const [isCoverImageOpen, setIsCoverImageOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // Validation
  const schema = getEditProductSchema(t);

  // Form
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EditProductFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: product.title ?? '',
      description: product.description ?? '',
      price: Number(product.price) || 0,
      discount: Number(product.discountValue) || 0,
      quantity: product.stock ?? 0,
      category: product.categoryId ?? '',
      occasion:
        product.occasion?.id ?? product.occasions?.[0]?.id ?? '',
    },
  });

  // Functions
  const { mutate: editProduct, isPending } = useEditProduct(
    product.id,
    gallery
  );
  const handleFormSubmit = (values: EditProductFormValues) => {
    editProduct(values);
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
            <FieldLabel htmlFor="productCover">
              {t('productCover')}
            </FieldLabel>
            <FileInput
              id="productCover"
              accept="image/*"
              aria-invalid={!!errors.productCover}
              {...register('productCover')}
            />
            <FieldError errors={[errors.productCover]} />

            {product.cover && (
              <>
                <button
                  type="button"
                  onClick={() => setIsCoverImageOpen(true)}
                  className="inline-flex items-center gap-2 text-sm text-text-info"
                >
                  <ImageIcon className="h-4 w-4" />
                  {t('productCover')}
                </button>
                <ViewImageModal
                  isOpen={isCoverImageOpen}
                  onClose={() => setIsCoverImageOpen(false)}
                  imageUrl={product.cover}
                  title={product.title}
                />
              </>
            )}
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

            {gallery.length > 0 ? (
              <>
                <button
                  type="button"
                  onClick={() => setIsGalleryOpen(true)}
                  className="inline-flex items-center gap-2 text-sm text-text-info"
                >
                  <ImageIcon className="h-4 w-4" />
                  {t('viewGallery')}
                </button>
                <ViewImageModal
                  isOpen={isGalleryOpen}
                  onClose={() => setIsGalleryOpen(false)}
                  imageUrls={gallery}
                  title={product.title}
                />
              </>
            ) : (
              <p className="text-sm text-text-muted">
                {t('noGalleryImages')}
              </p>
            )}
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
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    id="category"
                    onBlur={field.onBlur}
                    aria-invalid={fieldState.invalid}
                  >
                    <SelectValue placeholder={t('selectOption')}>
                      {
                        categories.find(
                          (category) => category.id === field.value
                        )?.title
                      }
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.id}
                      >
                        {category.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    id="occasion"
                    onBlur={field.onBlur}
                    aria-invalid={fieldState.invalid}
                  >
                    <SelectValue placeholder={t('selectOption')}>
                      {
                        occasions.find(
                          (occasion) => occasion.id === field.value
                        )?.title
                      }
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {occasions.map((occasion) => (
                      <SelectItem
                        key={occasion.id}
                        value={occasion.id}
                      >
                        {occasion.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
        </div>
      </FieldGroup>

      <Button type="submit" className="w-full " disabled={isPending}>
        {isPending ? t('updatingProduct') : t('updateProduct')}
      </Button>
    </form>
  );
}
