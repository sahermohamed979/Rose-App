import { IProductReviewresponse } from '@/features/products/types/create-product-review';
import { getDirectToken } from '@/shared/lib/actions/get-direct-token';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const token = await getDirectToken();
  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/reviews`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          headline: body.headline,
          content: body.content,
          rating: body.rating,
          productId: body.productId,
        }),
      }
    );
    const data: IProductReviewresponse = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, {
        status: response.status,
      });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
