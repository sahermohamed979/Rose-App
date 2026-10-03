import { NextResponse } from 'next/server';

import { getPushStatusServerAction } from '@/features/notifications/apis/notification-action';

export async function GET() {
  const payload = await getPushStatusServerAction();

  return NextResponse.json(payload);
}
