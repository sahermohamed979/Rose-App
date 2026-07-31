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

  const { productId, quantity = 1 } = await request.json();

  const response = await fetch(`${process.env.NEXT_API_URL}/cart`, {
    method: 'POST',
    headers: {
      ...HEADERS.jsonBody,
      ...HEADERS.authorization(accessToken),
    },
    body: JSON.stringify({ productId, quantity }),
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}

export async function GET(request: NextRequest) {
  const accessToken = await getAccessToken(request);

  if (!accessToken) {
    return unauthorizedResponse();
  }

  const response = await fetch(`${process.env.NEXT_API_URL}/cart`, {
    headers: {
      ...HEADERS.authorization(accessToken),
    },
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
