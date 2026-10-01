import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import Home from '@/features/home/screens/home-screen';

type HomeSearchParams = {
  occasion?: string | string[];
};

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<HomeSearchParams>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  // Translations
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'metadata.home',
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

export default async function Page({ searchParams }: PageProps) {
  // Variables
  const resolvedSearchParams = await searchParams;

  return <Home searchParams={resolvedSearchParams} />;
}
