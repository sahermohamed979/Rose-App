import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Get locale from request headers
  const locale = request.headers.get('Accept-Language') || 'en';

  const { searchParams } = new URL(request.url);
  const hasSearchParams = searchParams.toString().length > 0;

  const baseUrl = `${process.env.NEXT_API_URL}/products`;
  const url = hasSearchParams
    ? `${baseUrl}?${searchParams.toString()}`
    : `${baseUrl}?limit=5&sortBy=bestSelling&sortOrder=desc`;

  // Fetch from external API
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': locale,
    },
  });

  const data = await response.json();

  // Return response with original status
  return NextResponse.json(data, { status: response.status });
}
