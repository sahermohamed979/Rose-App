'use client';

import { useTranslations } from 'next-intl';
import { ErrorCartView } from '@/features/cart/components/error-cart-view';

export default function CartError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('cartError');

  return (
    <ErrorCartView
      title={t('title')}
      subtitle={t('subtitle')}
      error={error}
      reset={reset}
      primaryActionText={t('retry')}
      secondaryActionText={t('continueShopping')}
      secondaryActionHref="/products"
    />
  );
}
