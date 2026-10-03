import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { LockKeyhole, PackageCheck, User } from 'lucide-react';

import { Link } from '@/i18n/navigation';
import { Button } from '@/shared/components/ui/button';
import { getOrders } from '@/features/orders/apis/get-orders.api';
import OrderPage from '@/features/orders/components/order-page';
import OrderError from '@/features/orders/components/orderError';
import { getDirectToken } from '@/shared/lib/utils/get-direct-token';
import { checkPaymentStatus } from '@/features/checkout/apis/check-payment-status.api';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  // Translations
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'metadata.orders',
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

interface OrdersPageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function OrdersPage({
  searchParams,
}: OrdersPageProps) {
  // Translations
  const t = await getTranslations('orders');
  const tCommon = await getTranslations('common');

  // Verify Stripe payment status if returning from checkout session
  const resolvedSearchParams = await searchParams;
  if (resolvedSearchParams?.session_id) {
    try {
      await checkPaymentStatus(resolvedSearchParams.session_id);
    } catch {
      // Continue loading orders even if session verification throws
    }
  }

  const token = await getDirectToken();

  // Not authenticated
  if (!token) {
    return (
      <div className="container max-w-lg mx-auto px-4 py-16 sm:py-24">
        <div className="flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-3xl border border-border-muted/80 bg-card shadow-xs">
          <div className="size-20 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-5 ring-8 ring-primary/5">
            <LockKeyhole size={36} />
          </div>

          <h2 className="text-2xl font-bold text-text-primary mb-2">
            {t('loginPrompt')}
          </h2>

          <p className="text-text-muted text-sm sm:text-base mb-6 leading-relaxed">
            {t('loginSubtitle')}
          </p>

          <Link href="/login" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto rounded-full px-8 gap-2 shadow-sm"
            >
              <User size={16} />
              <span>{t('loginButton')}</span>
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Fetch first page via feature API service
  const initialData = await getOrders({ page: 1, limit: 12 });

  if (!initialData.status) {
    return (
      <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <OrderError />
      </div>
    );
  }

  const totalOrders =
    initialData.status && initialData.payload?.metadata?.total
      ? initialData.payload.metadata.total
      : 0;

  return (
    <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb"
        className="mb-4 text-xs sm:text-sm text-text-muted flex items-center gap-2"
      >
        <Link
          href="/"
          className="hover:text-primary transition-colors"
        >
          {tCommon('home')}
        </Link>
        <span>/</span>
        <span className="text-text-primary font-medium">
          {t('title')}
        </span>
      </nav>

      {/* Header Banner */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8 pb-6 border-b border-border-muted/60">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-2.5">
            <PackageCheck size={13} />
            <span>{t('order')}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
            {t('title')}
          </h1>

          <p className="text-text-muted text-sm sm:text-base mt-1.5 max-w-xl">
            {t('subtitle')}
          </p>
        </div>

        {totalOrders > 0 && (
          <div className="px-4 py-2 rounded-2xl bg-bg-muted/70 border border-border-muted/70 text-xs sm:text-sm font-semibold text-text-primary shrink-0">
            {t('itemsCount', { count: totalOrders })}
          </div>
        )}
      </div>

      <OrderPage initialData={initialData} />
    </div>
  );
}
