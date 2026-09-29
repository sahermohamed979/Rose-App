import OrderPage from '@/features/orders/components/order-page';
import OrderError from '@/features/orders/components/orderError';
import { getDirectToken } from '@/shared/lib/utils/get-direct-token';
import Link from 'next/link';

export default async function Page() {
  const token = await getDirectToken();

  // Not authenticated
  if (!token) {
    return (
      <div className="my-4 text-center">
        <p className="text-2xl font-bold">
          You need to{' '}
          <Link
            href="/login"
            className="text-center font-semibold text-text-info hover:mx-4 duration-500 hover:text-3xl"
          >
            Login
          </Link>{' '}
          to continue.
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
        Orders
      </p>

      <OrderPage initialData={initialData} />
    </div>
  );
}
