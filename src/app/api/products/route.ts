import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Get locale from request headers
  const locale = request.headers.get('Accept-Language') || 'en';

  // Extract search query if provided
  const { searchParams } = new URL(request.url);

  // Set default limit to 12
  if (!searchParams.has('limit')) {
    searchParams.set('limit', '12');
  }
  // Set default sorting parameters
  if (!searchParams.has('sortBy')) {
    searchParams.set('sortBy', 'bestSelling');
    searchParams.set('sortOrder', 'desc');
  }
  // Convert search parameters to a query string
  const queryString = searchParams.toString();
  // Build the external API URL with query string
  const baseUrl = `${process.env.API_URL}/products`;
  const url = `${baseUrl}?${queryString}`;
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
