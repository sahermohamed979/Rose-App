import { NextRequest, NextResponse } from 'next/server';
import { getDirectToken } from '@/shared/lib/utils/get-direct-token';

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  _req: NextRequest,
  { params }: RouteContext
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { status: false, message: 'Order ID is required', code: 400 },
      { status: 400 }
    );
  }

  const token = await getDirectToken();

  if (!token) {
    return NextResponse.json(
      { status: false, message: 'Unauthorized', code: 401 },
      { status: 401 }
    );
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/orders/${id}`,
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
  } catch (error: unknown) {
    return NextResponse.json(
      {
        status: false,
        message:
          error instanceof Error
            ? error.message
            : 'Failed to fetch order',
        code: 500,
      },
      { status: 500 }
    );
  }
}
