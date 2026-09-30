'use client';

import { Button } from '@/shared/components/ui/button';
import { useRouter } from 'next/navigation';

export default function OrderError() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-text-danger text-2xl font-black">
        Somthing went wrong
      </p>

      <Button
        onClick={() => {
          router.refresh();
        }}
        className="rounded-xl bg-maroon-600 px-6 py-2 my-4 text-white"
      >
        Try Again
      </Button>
    </div>
  );
}
