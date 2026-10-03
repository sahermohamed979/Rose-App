import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { getOccasionsPublic } from '@/features/occasions/apis/get-occasions-public.api';
import { OccasionsScreen } from '@/features/occasions/screens/occasions-screen';
import { OccasionsScreenSkeleton } from '@/features/occasions/skeletons/occasions-screen-skeleton';
import { JsonLd } from '@/shared/components/json-ld';

interface OccasionsSearchParams {
  search?: string;
  page?: string;
}

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<OccasionsSearchParams>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  // Translations
  const { locale } = await params;
  const [t, tApp] = await Promise.all([
    getTranslations({ locale, namespace: 'metadata.occasions' }),
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
          'زهور المناسبات',
          'ورد أعياد ميلاد',
          'زهور زفاف',
          'ورد تخرج',
          'باقات خطوبة',
          'هدايا مناسبات',
        ]
      : [
          'occasion flowers',
          'birthday bouquets',
          'wedding flowers',
          'anniversary roses',
          'graduation gifts',
          'celebration blooms',
        ],
    alternates: {
      canonical: `/${locale}/occasions`,
      languages: {
        en: '/en/occasions',
        ar: '/ar/occasions',
      },
    },
    openGraph: {
      title: `${title} | ${appName}`,
      description,
      url: `/${locale}/occasions`,
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

async function OccasionsContent({
  searchParamsPromise,
  localePromise,
}: {
  searchParamsPromise: Promise<OccasionsSearchParams>;
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
  const response = await getOccasionsPublic({
    page,
    limit: 50,
    search,
  });

  const occasions = response.status ? response.payload.data : [];
  const totalCount = response.status
    ? (response.payload.metadata?.total ?? occasions.length)
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
          name: locale === 'ar' ? 'المناسبات' : 'Occasions',
          item: `${baseUrl}/${locale}/occasions`,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name:
        locale === 'ar'
          ? 'زهور المناسبات'
          : 'Occasion Flowers & Gifts',
      description:
        locale === 'ar'
          ? 'باقات وتنسيقات زهور فاخرة لكل مناسباتكم السعيدة'
          : 'Luxury flower bouquets and gifts for every milestone celebration',
      url: `${baseUrl}/${locale}/occasions`,
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: occasions.length,
        itemListElement: occasions.map((occ, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: occ.title,
          url: `${baseUrl}/${locale}/products?occasionId=${occ.id}`,
        })),
      },
    },
  ];

  return (
    <>
      <JsonLd data={jsonLdData} />
      <OccasionsScreen
        occasions={occasions}
        totalCount={totalCount}
        searchQuery={search}
      />
    </>
  );
}

export default function OccasionsPage({
  searchParams,
  params,
}: PageProps) {
  return (
    <Suspense fallback={<OccasionsScreenSkeleton />}>
      <OccasionsContent
        searchParamsPromise={searchParams}
        localePromise={params}
      />
    </Suspense>
  );
}
