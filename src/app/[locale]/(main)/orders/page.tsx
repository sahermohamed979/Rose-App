import OrderPage from '@/features/orders/components/order-page';
import OrderSkeleton from '@/features/orders/skeltons/order-skeleton';
import React, { Suspense } from 'react';

export default async function page() {
  return (
    <div className="mx-20 mt-15.5 ">
      <p className="text-5xl font-bold text-text-plain mb-6">
        Orders
      </p>

      <OrderPage />
    </div>
  );
}
