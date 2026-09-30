import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { getTranslations } from 'next-intl/server';

import { authOptions } from '@/auth';
import { getCart } from '@/features/cart/apis/cart-service';
import CartScreen from '@/features/cart/screen/cart-screen';
import type { ICartResponse } from '@/features/cart/types/cart-types';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  // Translations
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'metadata.cart',
  });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
    },
  };
}

export default async function CartPage() {
  // Session
  const session = await getServerSession(authOptions);

  if (session?.user) {
    const cartResponse = await getCart();

    if (!cartResponse.status) {
      throw new Error(cartResponse.message);
    }

    return (
      <CartScreen
        cartResponse={cartResponse.payload as ICartResponse}
      />
    );
  }

  return <CartScreen cartResponse={{ cartItems: [] }} />;
}
