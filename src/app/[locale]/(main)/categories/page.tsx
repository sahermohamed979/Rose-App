import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { getCategoriesPublic } from '@/features/categories/apis/get-categories-public.api';
import { CategoriesScreen } from '@/features/categories/screens/categories-screen';
import { CategoriesScreenSkeleton } from '@/features/categories/skeletons/categories-screen-skeleton';
import { JsonLd } from '@/shared/components/json-ld';

interface CategoriesSearchParams {
  search?: string;
  page?: string;
}

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<CategoriesSearchParams>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  // Translations
  const { locale } = await params;
  const [t, tApp] = await Promise.all([
    getTranslations({ locale, namespace: 'metadata.categories' }),
    getTranslations({ locale, namespace: 'metadata.app' }),
  ]);

  const isAr = locale === 'ar';
  const title = t('title');
  const description = t('description');
  const appName = tApp('name');

  return {
    title,
    description,
    keywords: isAr
      ? [
          'تصنيفات الزهور',
          'باقات الورد',
          'زهور طبيعية',
          'هدايا فاخرة',
          'تنسيق ورد',
          'روز',
        ]
      : [
          'flower categories',
          'fresh flowers',
          'luxury bouquets',
          'gift boxes',
          'flower arrangements',
          'rose store',
        ],
    alternates: {
      canonical: `/${locale}/categories`,
      languages: {
        en: '/en/categories',
        ar: '/ar/categories',
      },
    },
    openGraph: {
      title: `${title} | ${appName}`,
      description,
      url: `/${locale}/categories`,
      siteName: appName,
      locale: isAr ? 'ar_EG' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${appName}`,
      description,
    },
  };
}

async function CategoriesContent({
  searchParamsPromise,
  localePromise,
}: {
  searchParamsPromise: Promise<CategoriesSearchParams>;
  localePromise: Promise<{ locale: string }>;
}) {
  // Variables
  const [{ locale }, searchParams] = await Promise.all([
    localePromise,
    searchParamsPromise,
  ]);
  const search = searchParams.search;
  const page = searchParams.page ? Number(searchParams.page) : 1;

  // Data fetching
  const response = await getCategoriesPublic({
    page,
    limit: 50,
    search,
  });

  const categories = response.status ? response.payload.data : [];
  const totalCount = response.status
    ? (response.payload.metadata?.total ?? categories.length)
    : 0;

  const baseUrl = (
    process.env.NEXT_PUBLIC_APP_URL ||
    'https://rose-app-gilt.vercel.app'
  ).replace(/\/+$/, '');

  // SEO Structured Data
  const jsonLdData = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: locale === 'ar' ? 'الرئيسية' : 'Home',
          item: `${baseUrl}/${locale}`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: locale === 'ar' ? 'التصنيفات' : 'Categories',
          item: `${baseUrl}/${locale}/categories`,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: locale === 'ar' ? 'تصنيفات الزهور' : 'Flower Categories',
      description:
        locale === 'ar'
          ? 'استكشف تشكيلات الزهور والهدايا الفاخرة'
          : 'Explore luxury flower bouquet and gift collections',
      url: `${baseUrl}/${locale}/categories`,
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: categories.length,
        itemListElement: categories.map((cat, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: cat.title,
          url: `${baseUrl}/${locale}/products?categoryId=${cat.id}`,
        })),
      },
    },
  ];

  return (
    <>
      <JsonLd data={jsonLdData} />
      <CategoriesScreen
        categories={categories}
        totalCount={totalCount}
        searchQuery={search}
      />
    </>
  );
}

export default function CategoriesPage({
  searchParams,
  params,
}: PageProps) {
  return (
    <Suspense fallback={<CategoriesScreenSkeleton />}>
      <CategoriesContent
        searchParamsPromise={searchParams}
        localePromise={params}
      />
    </Suspense>
  );
}
