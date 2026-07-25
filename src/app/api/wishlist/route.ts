import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const token = await getToken({ req: request });
    const accessToken = (token as any)?.accessToken || (token as any)?.token || '';

    const externalResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wishlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    const data = await externalResponse.json();

    if (!externalResponse.ok) {
      return NextResponse.json(data, { status: externalResponse.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = await getToken({ req: request });
    const accessToken = (token as any)?.accessToken || (token as any)?.token || '';

    if (!accessToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const externalResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wishlist`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const text = await externalResponse.text();
    const data = text ? JSON.parse(text) : { payload: [] };

    if (!externalResponse.ok) {
      return NextResponse.json(data, { status: externalResponse.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('❌ [Route GET Wishlist Error]:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
