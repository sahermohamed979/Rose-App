import { getAllNotification } from '@/features/notifications/apis/notification-action';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const payload = await getAllNotification(req);

  return NextResponse.json(payload);
}
