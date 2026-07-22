import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Get locale from request headers
  const locale = request.headers.get('Accept-Language') || 'en';

  // Extract search query if provided
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || '';

  // Build external API URL
  const baseUrl = `${process.env.API_URL}/products`;
  const url = query
    ? `${baseUrl}`
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
