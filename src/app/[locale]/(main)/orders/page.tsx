import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

import OrderPage from '@/features/orders/components/order-page';
import OrderError from '@/features/orders/components/orderError';
import { getDirectToken } from '@/shared/lib/utils/get-direct-token';

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

export default async function OrdersPage() {
  // Translations
  const t = await getTranslations('orders');

  const token = await getDirectToken();

  // Not authenticated
  if (!token) {
    return (
      <div className="my-4 text-center">
        <p className="text-2xl font-bold">
          {t.rich('loginRequired', {
            login: (chunks) => (
              <Link
                href="/login"
                className="text-center font-semibold text-text-info hover:mx-4 duration-500 hover:text-3xl"
              >
                {chunks}
              </Link>
            ),
          })}
        </p>
      </div>
    );
  }

  // Fetch first page
  const response = await fetch(
    `${process.env.NEXT_API_URL}/orders?page=1&limit=12`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const initialData = await response.json();

  // Initial API error
  if (!response.ok) {
    return <OrderError />;
  }

  return (
    <div className="mx-20 mt-15.5">
      <p className="text-5xl font-bold text-text-plain mb-6">
        {t('title')}
      </p>

      <OrderPage initialData={initialData} />
    </div>
  );
}
