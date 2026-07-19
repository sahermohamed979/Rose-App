import Home from '@/features/home/screens/home';
import React from 'react';

type HomeSearchParams = {
  occasion?: string | string[];
};

interface PageProps {
  searchParams: Promise<HomeSearchParams>;
}

export default async function Page({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;

  return <Home searchParams={resolvedSearchParams} />;
}
