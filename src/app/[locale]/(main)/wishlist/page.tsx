import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import WishlistPage from '@/features/wishlist-page/screen/wishlist-screen';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  // Translations
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'metadata.wishlist',
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

export default function WishlistScreenPage() {
  return <WishlistPage />;
}
