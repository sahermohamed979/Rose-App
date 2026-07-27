import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const EMPTY_CART_RESPONSE = { payload: { cartItems: [] } };

// Read token from the request cookies
async function getAccessToken(
  request: NextRequest
): Promise<string | undefined> {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  return token?.accessToken as string | undefined;
}

export async function GET(request: NextRequest) {
  const accessToken = await getAccessToken(request);

  // No token means guest user - return an empty cart
  if (!accessToken) {
    return NextResponse.json(EMPTY_CART_RESPONSE, { status: 200 });
  }

  try {
    const externalResponse = await fetch(
      `${process.env.NEXT_API_URL}/cart`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        cache: 'no-store',
      }
    );

    const text = await externalResponse.text();
    const data: unknown = text
      ? JSON.parse(text)
      : EMPTY_CART_RESPONSE;

    return NextResponse.json(data, {
      status: externalResponse.status,
    });
  } catch (error) {
    console.error('Failed to fetch cart:', error);
    return NextResponse.json(EMPTY_CART_RESPONSE, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const accessToken = await getAccessToken(request);

  if (!accessToken) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();

    const externalResponse = await fetch(
      `${process.env.NEXT_API_URL}/cart`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(body),
      }
    );

    const text = await externalResponse.text();
    const data: unknown = text ? JSON.parse(text) : {};

    return NextResponse.json(data, {
      status: externalResponse.status,
    });
  } catch (error) {
    console.error('Failed to add item to cart:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
