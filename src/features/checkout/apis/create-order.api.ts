'use server';
import { getAuthToken } from '@/shared/lib/actions/getToken';
import { updateTag } from 'next/cache';
import { CreateOrderBody } from '../types/payment-types';

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
    return data;
  }
  updateTag('cart');

  return data;
}
