import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { ContactScreen } from '@/features/contact/screens/contact-screen';
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
    getTranslations({ locale, namespace: 'metadata.contact' }),
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
          'اتصل بنا',
          'خدمة عملاء روز',
          'متجر زهور الزمالك',
          'تواصل مع محل ورد',
          'استفسارات الزهور',
        ]
      : [
          'contact us',
          'rose customer support',
          'florist Zamalek Cairo',
          'custom bouquet inquiry',
          'flower delivery support',
        ],
    alternates: {
      canonical: `/${locale}/contact`,
      languages: {
        en: '/en/contact',
        ar: '/ar/contact',
      },
    },
    openGraph: {
      title: `${title} | ${appName}`,
      description,
      url: `/${locale}/contact`,
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

export default async function ContactPage({ params }: PageProps) {
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
          name: locale === 'ar' ? 'اتصل بنا' : 'Contact Us',
          item: `${baseUrl}/${locale}/contact`,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name:
        locale === 'ar' ? 'اتصل بمتجر روز' : 'Contact Rose Florist',
      description:
        locale === 'ar'
          ? 'تواصل مع فريق خدمة عملاء روز للاستفسارات والطلبات الخاصة'
          : 'Get in touch with Rose support for inquiries and bespoke floral orders',
      url: `${baseUrl}/${locale}/contact`,
      mainEntity: {
        '@type': 'Florist',
        name: 'Rose Luxury Florals',
        image: `${baseUrl}/Logo.svg`,
        telephone: '+201009876543',
        email: 'support@roseapp.com',
        priceRange: '$$$',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '24 Nile Corniche',
          addressLocality: 'Zamalek',
          addressRegion: 'Cairo',
          addressCountry: 'EG',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '30.0626',
          longitude: '31.2197',
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
            ],
            opens: '09:00',
            closes: '23:00',
          },
        ],
      },
    },
  ];

  return (
    <>
      <JsonLd data={jsonLdData} />
      <ContactScreen />
    </>
  );
}
