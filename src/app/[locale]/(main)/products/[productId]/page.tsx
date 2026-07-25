import React from 'react';
interface PageProps {
  params: Promise<{
    productId: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { productId } = await params;
  return <div>{productId}</div>;
}
