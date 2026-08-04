import React from 'react';
import { redirect } from 'next/navigation';
import { getUserAddresses } from '@/features/checkout/apis/get-user-adresses.api';
import CheckoutScreen from '@/features/checkout/screens/checkout-screen';

export default async function CheckoutPage() {
  const response = await getUserAddresses();

  if (!response.status && response.code === 401) {
    redirect('/login');
  }

  const initialData = response.status ? response.payload : undefined;

  return <CheckoutScreen initialData={initialData} />;
}
