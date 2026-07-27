'use server';

import type { ApiResponse } from '@/shared/lib/types/api';
import { SubscribeFormValues } from '../schemas/subscribe.schema';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function subscribeToNewsletter(
  values: SubscribeFormValues
): Promise<{ success: boolean; message: string }> {
  const res = await fetch(`${BASE_URL}/subscriptions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  });

  const data: ApiResponse<unknown> = await res.json();

  if (!data.status) {
    return {
      success: false,
      message:
        data.message || 'Subscription failed. Please try again.',
    };
  }

  return {
    success: true,
    message: data.message || 'Successfully subscribed!',
  };
}
