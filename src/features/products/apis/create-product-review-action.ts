'use server';
export default async function CreateProductReviewAction(
  reviewData: ReviewData
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/reviews`,
    {
      method: 'POST',
      headers: {
        // Authorization:`Bearer yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyMWE0N2Y1OS0xNjhhLTRiYjUtYTlmYS01NWZhNjdiOTkwMjUiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc4NDgwNTYwMiwiZXhwIjoxNzg1NDEwNDAyfQ.3TL66tzpR2GsXgI6NIRehl7zOzK5YwUmeCz-ZwVkR4g` ,
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
