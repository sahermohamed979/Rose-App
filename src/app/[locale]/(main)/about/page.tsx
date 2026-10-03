import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { AboutScreen } from '@/features/about/screens/about-screen';
import { JsonLd } from '@/shared/components/json-ld';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  // Translations
  const { locale } = await params;
  const [t, tApp] = await Promise.all([
    getTranslations({ locale, namespace: 'metadata.about' }),
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
          'من نحن',
          'قصة روز',
          'متجر ورد فاخر',
          'منسقو زهور محترفون',
          'فن تنسيق الزهور',
          'زهور مستدامة',
        ]
      : [
          'about us',
          'rose story',
          'luxury florist',
          'flower artistry',
          'sustainable flowers',
          'master florists Cairo',
        ],
    alternates: {
      canonical: `/${locale}/about`,
      languages: {
        en: '/en/about',
        ar: '/ar/about',
      },
    },
    openGraph: {
      title: `${title} | ${appName}`,
      description,
      url: `/${locale}/about`,
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

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
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
          name: locale === 'ar' ? 'من نحن' : 'About Us',
          item: `${baseUrl}/${locale}/about`,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name:
        locale === 'ar'
          ? 'عن متجر روز للزهور'
          : 'About Rose Luxury Florals',
      description:
        locale === 'ar'
          ? 'تعرف على قصة روز وشغفنا بفن تنسيق الزهور الطبيعية الفاخرة'
          : 'Learn about Rose floral heritage, master florists, and sustainable luxury blooms',
      url: `${baseUrl}/${locale}/about`,
      mainEntity: {
        '@type': 'Organization',
        name: 'Rose Luxury Florals',
        url: baseUrl,
        logo: `${baseUrl}/Logo.svg`,
        description:
          locale === 'ar'
            ? 'متجر متخصص في تصميم وباقات الزهور الطبيعية والهدايا الفاخرة'
            : 'Premium floral design studio crafting luxury fresh flower arrangements and gift experiences',
        foundingDate: '2020',
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+201009876543',
          contactType: 'customer service',
          availableLanguage: ['Arabic', 'English'],
        },
      },
    },
  ];

  return (
    <>
      <JsonLd data={jsonLdData} />
      <AboutScreen />
    </>
  );
}
