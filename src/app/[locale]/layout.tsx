import type { Metadata } from 'next';
import { Geist_Mono, Tajawal, Sarabun } from 'next/font/google';
import { cn } from '@/shared/lib/utils/utils';
import Providers from '@/shared/context/global/providers';
import { hasLocale } from 'next-intl';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import '../globals.css';
import { Toaster } from '@/shared/components/ui/sonner';

const tajawal = Tajawal({
  subsets: ['arabic'],
  variable: '--font-tajawal',
  weight: ['300', '400', '500', '700'],
  fallback: ['system-ui', 'sans-serif'],
});

const sarabun = Sarabun({
  subsets: ['latin'],
  variable: '--font-sarabun',
  weight: ['300', '400', '500', '700'],
  fallback: ['system-ui', 'sans-serif'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'metadata.app',
  });
  const isAr = locale === 'ar';

  const title = t('title');
  const description = t('description');
  const appName = t('name');

  return {
    title: {
      default: title,
      template: `%s | ${appName}`,
    },
    description,
    applicationName: appName,
    keywords: isAr
      ? [
          'زهور',
          'ورد',
          'باقات ورد',
          'هدايا',
          'توصيل زهور',
          'متجر ورد',
          'روز',
          'مناسبات',
          'زهور فاخرة',
        ]
      : [
          'flowers',
          'roses',
          'flower delivery',
          'bouquets',
          'luxury flowers',
          'gifts',
          'occasions flowers',
          'Rose app',
        ],
    authors: [{ name: 'Rose Team' }],
    creator: 'Rose',
    publisher: 'Rose',
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        ar: '/ar',
      },
    },
    openGraph: {
      title: {
        default: title,
        template: `%s | ${appName}`,
      },
      description,
      siteName: appName,
      locale: isAr ? 'ar_EG' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: {
        default: title,
        template: `%s | ${appName}`,
      },
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const paramsResult = await params;
  const locale = paramsResult.locale;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  //enable ssg
  setRequestLocale(locale);
  return (
    <html
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      suppressHydrationWarning
      className={cn(
        'h-full',
        'antialiased',
        sarabun.variable,
        tajawal.variable,
        geistMono.variable,
        locale === 'ar' ? 'font-tajawal' : 'font-sans'
      )}
    >
      <body className="min-h-full flex flex-col ">
        <Providers>
          {children}
          <Toaster position="bottom-right" />
        </Providers>
      </body>
    </html>
  );
}
