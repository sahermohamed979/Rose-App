'use client';

import { useTranslations } from 'next-intl';
import { useWatch, type Control } from 'react-hook-form';

import { Field, FieldLabel } from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import type { AddNewProductFormValues } from '../schemas/add-product-schema';

interface DiscountedPriceFieldProps {
  control: Control<AddNewProductFormValues>;
}

export default function DiscountedPriceField({
  control,
}: DiscountedPriceFieldProps) {
  // Translations
  const t = useTranslations('dashboard.products');

  // Isolate price updates so they do not rerender the full form.
  const [price, discount] = useWatch({
    control,
    name: ['price', 'discount'],
  });

  // Variables
  const currentPrice = Number.isFinite(price) ? price : 0;
  const currentDiscount = Number.isFinite(discount) ? discount : 0;
  const discountedPrice = Math.max(
    0,
    currentPrice - (currentPrice * currentDiscount) / 100
  );

  return (
    <Field>
      <FieldLabel htmlFor="priceAfterDiscount">
        {t('discountPrice')}
      </FieldLabel>
      <Input
        id="priceAfterDiscount"
        type="number"
        min={0}
        value={discountedPrice}
        readOnly
      />
    </Field>
  );
}
