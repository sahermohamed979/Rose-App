import { NextRequest, NextResponse } from 'next/server';

import {
  subscribePushServerAction,
  unsubscribePushServerAction,
} from '@/features/notifications/apis/notification-action';
import type { PushSubscriptionInput } from '@/features/notifications/types/notification-types';

export async function POST(request: NextRequest) {
  const subscription: PushSubscriptionInput = await request.json();

  const payload = await subscribePushServerAction(subscription);

  return NextResponse.json(payload);
}

export async function DELETE(request: NextRequest) {
  const { endpoint }: { endpoint: string } = await request.json();

  const payload = await unsubscribePushServerAction(endpoint);

  return NextResponse.json(payload);
}
