'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import type {
  OccasionType,
  ProductCategory,
} from '@/shared/lib/types/product-types';
import { Button } from '@/shared/components/ui/button';
import {
  getAddProductSchema,
  type AddNewProductFormValues,
} from '../schemas/add-product-schema';
import ProductFormFields from './product-form-fields';
import { useAddProduct } from '../hooks/use-add-product';

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
      className="flex flex-col gap-6 md:p-0"
    >
      <ProductFormFields
        register={register}
        control={control}
        errors={errors}
        categories={categories}
        occasions={occasions}
        isCoverRequired
      />

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? t('addingProduct') : t('addProduct')}
      </Button>
    </form>
  );
}
