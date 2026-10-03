import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { LockKeyhole, PackageX, User } from 'lucide-react';

import { Link } from '@/i18n/navigation';
import { Button } from '@/shared/components/ui/button';
import { getDirectToken } from '@/shared/lib/utils/get-direct-token';
import { getOrderById } from '@/features/orders/apis/get-order-by-id.api';
import { OrderDetailsView } from '@/features/orders/components/order-details-view';
import type { Order } from '@/features/orders/types/order-types';

interface OrderDetailsPageProps {
  params: Promise<{
    id: string;
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: OrderDetailsPageProps): Promise<Metadata> {
  // Translations
  const { id, locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'orders',
  });

  return {
    title: `${t('orderDetails')} #${id.slice(0, 8)}`,
    description: t('subtitle'),
  };
}

export default async function OrderDetailsPage({
  params,
}: OrderDetailsPageProps) {
  // Navigation & Parameters
  const { id } = await params;

  // Translations
  const t = await getTranslations('orders');

  // Authentication check
  const token = await getDirectToken();

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

  // Fetch Order by ID using feature API
  const response = await getOrderById(id);

  // Normalize order object from response
  const order: Order | undefined =
    response.status && response.payload
      ? (
          response.payload as unknown as {
            order?: Order;
            data?: Order;
          }
        )?.order ||
        (
          response.payload as unknown as {
            order?: Order;
            data?: Order;
          }
        )?.data ||
        response.payload
      : undefined;

  // Order Not Found
  if (!order || !order.id) {
    return (
      <div className="container max-w-lg mx-auto px-4 py-16 sm:py-24 text-center">
        <div className="flex flex-col items-center justify-center p-8 sm:p-12 rounded-3xl border border-border-muted/80 bg-card shadow-xs">
          <div className="size-20 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mb-5 ring-8 ring-destructive/5">
            <PackageX size={36} />
          </div>

          <h2 className="text-2xl font-bold text-text-primary mb-2">
            {t('orderNotFound')}
          </h2>

          <p className="text-text-muted text-sm sm:text-base mb-6 leading-relaxed">
            {t('orderNotFoundDesc')}
          </p>

          <Link href="/orders">
            <Button size="lg" className="rounded-full px-8 shadow-sm">
              {t('backToOrders')}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return <OrderDetailsView order={order} />;
}
