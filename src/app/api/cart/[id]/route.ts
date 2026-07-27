import { getAccessToken } from '@/shared/lib/utils/get-access-token';
import { NextResponse, NextRequest } from 'next/server';


export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: 'Cart item ID is required' }, { status: 400 });
  }

  const accessToken = await getAccessToken(request);

  if (!accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const externalResponse = await fetch(`${process.env.NEXT_API_URL}/cart/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const text = await externalResponse.text();
    const data: unknown = text ? JSON.parse(text) : { success: true };

    return NextResponse.json(data, { status: externalResponse.status });
  } catch (error) {
    console.error('Failed to delete cart item:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}