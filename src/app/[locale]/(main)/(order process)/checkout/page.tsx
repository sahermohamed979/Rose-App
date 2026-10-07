import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { redirect } from '@/i18n/navigation';
import { getUserAddresses } from '@/features/checkout/apis/get-user-adresses.api';
import CheckoutScreen from '@/features/checkout/screens/checkout-screen';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  // Translations
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'metadata.checkout',
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

interface CheckoutPageProps {
  params: Promise<{ locale: string }>;
}

export default async function CheckoutPage({
  params,
}: CheckoutPageProps) {
  const { locale } = await params;

  // Data
  const response = await getUserAddresses();

  if (!response.status) {
    if (
      response.code === 401 ||
      response.message === 'Unauthorized'
    ) {
      redirect({ href: '/login?returnUrl=/checkout', locale });
    }

    if (response.code === 404) {
      return <CheckoutScreen initialData={{ addresses: [] }} />;
    }

    throw new Error(response.message);
  }

  const initialData = response.payload;

  return <CheckoutScreen initialData={initialData} />;
}
