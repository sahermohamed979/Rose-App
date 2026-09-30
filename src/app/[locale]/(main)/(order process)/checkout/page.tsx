import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

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

export default async function CheckoutPage() {
  // Data
  const response = await getUserAddresses();

  if (!response.status) {
    throw new Error(response.message);
  }

  const initialData = response.status ? response.payload : undefined;

  return <CheckoutScreen initialData={initialData} />;
}
