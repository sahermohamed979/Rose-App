import { json } from 'zod';
import { getDirectToken } from '@/shared/lib/utils/get-direct-token';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const searchParam = req.nextUrl.searchParams;

  const page = searchParam.get('page') ?? 1;
  const limit = searchParam.get('limit') ?? 12;

  const token = await getDirectToken();

  const response = await fetch(
    `${process.env.NEXT_API_URL}/orders?page=${page}&limit=${limit}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  return NextResponse.json(data, {
    status: (await response).status,
  });
}
