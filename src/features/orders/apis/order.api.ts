'use server';

import { getDirectToken } from '@/shared/lib/utils/get-direct-token';
import { OrderError, OrdersResponse } from '../types/order-types';

export async function ordersApi({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) {
  const token = await getDirectToken();

  const reponse = await fetch(
    `${process.env.NEXT_API_URL}/orders?page=${page}&limit=${limit}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data: OrdersResponse = await reponse.json();
  if (!reponse.ok) {
    const dataErrorv = data as OrderError;

    throw new Error(dataErrorv.message);
  }
  return data;
}
