import { NextRequest, NextResponse } from 'next/server';
import { getDirectToken } from '@/shared/lib/utils/get-direct-token';

export async function GET(req: NextRequest) {
  const searchParam = req.nextUrl.searchParams;

  const page = searchParam.get('page') ?? '1';
  const limit = searchParam.get('limit') ?? '12';

  const token = await getDirectToken();

  if (!token) {
    return NextResponse.json(
      { status: false, message: 'Unauthorized', code: 401 },
      { status: 401 }
    );
  }

  const response = await fetch(
    `${process.env.NEXT_API_URL}/orders?page=${page}&limit=${limit}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    }
  );

  const data = await response.json();

  return NextResponse.json(data, {
    status: response.status,
  });
}
