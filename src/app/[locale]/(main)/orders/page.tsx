import OrdersPage from '@/features/orders/components/orders-page';
import { getDirectToken } from '@/shared/lib/utils/get-direct-token';
import { Suspense } from 'react';

export default async function page() {
  const token = await getDirectToken();

  const dataPromise = fetch(`${process.env.NEXT_API_URL}/orders`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());

  return (
    <div>
      <Suspense fallback={'loading..........'}>
        <OrdersPage dataPromise={dataPromise} />
      </Suspense>
    </div>
  );
}
