import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

interface AppToken {
  accessToken?: string;
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: 'Wishlist ID is required' },
        { status: 400 }
      );
    }

    const token = (await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    })) as AppToken | null;

    if (!token?.accessToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const externalResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/wishlist/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.accessToken}`,
        },
      }
    );

    const text = await externalResponse.text();
    const data: unknown = text ? JSON.parse(text) : { success: true };

    if (!externalResponse.ok) {
      return NextResponse.json(data, {
        status: externalResponse.status,
      });
    }

    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
