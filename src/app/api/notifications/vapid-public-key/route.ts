import { NextResponse } from 'next/server';

import { getVapidPublicKeyServerAction } from '@/features/notifications/apis/notification-action';

export async function GET() {
  const payload = await getVapidPublicKeyServerAction();

  return NextResponse.json(payload);
}
