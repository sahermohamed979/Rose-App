export default async function CreateProductReviewAction(
  reviewData: ReviewData
) {
  const res = await fetch(`/api/form-review`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reviewData),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to create review');
  }
  return data;
}
