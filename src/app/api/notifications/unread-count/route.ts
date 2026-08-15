import { NextResponse } from 'next/server';

import { getUnreadCountServerAction } from '@/features/notifications/apis/notification-action';

export async function GET() {
  const payload = await getUnreadCountServerAction();

  return NextResponse.json(payload);
}
