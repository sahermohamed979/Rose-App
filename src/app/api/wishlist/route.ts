import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { HEADERS } from '@/shared/lib/constants/api.constants';

async function getAccessToken(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const accessToken = token?.accessToken;

  return typeof accessToken === 'string' ? accessToken : null;
}

function unauthorizedResponse() {
  return NextResponse.json(
    { status: false, message: 'Unauthorized' },
    { status: 401 }
  );
}

export async function POST(request: NextRequest) {
  const accessToken = await getAccessToken(request);

  if (!accessToken) {
    return unauthorizedResponse();
  }

  const { productId } = await request.json();

  const response = await fetch(
    `${process.env.NEXT_API_URL}/wishlist`,
    {
      method: 'POST',
      headers: {
        ...HEADERS.jsonBody,
        ...HEADERS.authorization(accessToken),
      },
      body: JSON.stringify({ productId }),
    }
  );

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}

export async function GET(request: NextRequest) {
  const accessToken = await getAccessToken(request);

  if (!accessToken) {
    return unauthorizedResponse();
  }

  const response = await fetch(
    `${process.env.NEXT_API_URL}/wishlist`,
    {
      headers: {
        ...HEADERS.authorization(accessToken),
      },
    }
  );

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}

export async function DELETE(request: NextRequest) {
  const accessToken = await getAccessToken(request);

  if (!accessToken) {
    return unauthorizedResponse();
  }

  const { productId } = await request.json();

  const wishlistResponse = await fetch(
    `${process.env.NEXT_API_URL}/wishlist`,
    {
      headers: {
        ...HEADERS.authorization(accessToken),
      },
    }
  );

  const wishlistData = await wishlistResponse.json();

  if (!wishlistResponse.ok) {
    return NextResponse.json(wishlistData, {
      status: wishlistResponse.status,
    });
  }

  const wishlistItem = wishlistData?.payload?.wishlistItems?.find(
    (item: { id: string; productId: string }) =>
      item.productId === productId
  );

  if (!wishlistItem) {
    return NextResponse.json(
      { status: false, message: 'Product is not in wishlist' },
      { status: 404 }
    );
  }

  const response = await fetch(
    `${process.env.NEXT_API_URL}/wishlist/${wishlistItem.id}`,
    {
      method: 'DELETE',
      headers: {
        ...HEADERS.authorization(accessToken),
      },
    }
  );

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
