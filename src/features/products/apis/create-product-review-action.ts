'use server';

import { getServerSession } from 'next-auth';

export default async function CreateProductReviewAction(
  reviewData: ReviewData
) {
  const token = await getServerSession();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/reviews`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyMWE0N2Y1OS0xNjhhLTRiYjUtYTlmYS01NWZhNjdiOTkwMjUiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc4NTI1NDI4MCwiZXhwIjoxNzg1ODU5MDgwfQ.O4-bxTTjFF44TdXHH7mh7xTQjhmUCiLHoAsIaKHbVeA`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    }
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to create review');
  }
  return data;
}
