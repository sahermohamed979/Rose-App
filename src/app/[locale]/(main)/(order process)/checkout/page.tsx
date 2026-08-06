import React from 'react';
import { getUserAddresses } from '@/features/checkout/apis/get-user-adresses.api';
import CheckoutScreen from '@/features/checkout/screens/checkout-screen';

export default async function CheckoutPage() {
  const response = await getUserAddresses();

  if (!response.status) {
    throw new Error(response.message);
  }

  const initialData = response.status ? response.payload : undefined;

  return <CheckoutScreen initialData={initialData} />;
}
