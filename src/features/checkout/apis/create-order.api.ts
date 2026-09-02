'use server';
import { getAuthToken } from '@/shared/lib/actions/getToken';
import { updateTag } from 'next/cache';

export interface CreateOrderBody {
  addressId: string;
  paymentMethod: 'CASH_ON_DELIVERY' | 'CREDIT_CARD';
  couponCode?: string;
  notes?: string;
  successUrl?: string;
}

export async function createOrder(body: CreateOrderBody) {
  const jwt = await getAuthToken();
  const token = jwt?.accessToken as string | undefined;

  const response = await fetch(`${process.env.NEXT_API_URL}/orders`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }
  updateTag('cart');

  return data;
}
