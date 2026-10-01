'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ImageIcon } from 'lucide-react';

import type {
  IProduct,
  OccasionType,
  ProductCategory,
} from '@/shared/lib/types/product-types';
import { Button } from '@/shared/components/ui/button';
import {
  getEditProductSchema,
  type EditProductFormValues,
} from '../schemas/edit-product-schema';
import ProductFormFields from './product-form-fields';
import { useEditProduct } from '../hooks/use-edit-product';
import ViewImageModal from '@/shared/components/view-image-modal';

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
  const gallery = Array.isArray(product.gallery)
    ? product.gallery
    : [];

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
        product.occasion?.id ??
        product.occasions?.[0]?.occasionId ??
        '',
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
      className="flex flex-col gap-6 md:p-0"
    >
      <ProductFormFields
        register={register}
        control={control}
        errors={errors}
        categories={categories}
        occasions={occasions}
        isCoverRequired={false}
        coverPreview={
          product.cover && (
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
          )
        }
        galleryPreview={
          gallery.length > 0 ? (
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
          )
        }
      />

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? t('updatingProduct') : t('updateProduct')}
      </Button>
    </form>
  );
}
