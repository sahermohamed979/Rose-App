import { NextResponse } from 'next/server';

const DEFAULT_PRODUCTS_LIMIT = '12';
const DEFAULT_SORT_BY = 'bestSelling';
const DEFAULT_SORT_ORDER = 'desc';

export async function GET(request: Request) {
  const locale = request.headers.get('Accept-Language') || 'en';
  const { searchParams } = new URL(request.url);

  if (!searchParams.has('limit')) {
    searchParams.set('limit', DEFAULT_PRODUCTS_LIMIT);
  }

  // Skip default sorting when the user is actively searching
  if (!searchParams.has('sortBy') && !searchParams.has('search')) {
    searchParams.set('sortBy', DEFAULT_SORT_BY);
    searchParams.set('sortOrder', DEFAULT_SORT_ORDER);
  }

  const url = `${process.env.NEXT_API_URL}/products?${searchParams.toString()}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': locale,
      },
    });

    const data: unknown = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return NextResponse.json(
      { payload: { data: [] } },
      { status: 500 }
    );
  }
}
