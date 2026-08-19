import { Button } from '@base-ui/react';
import { MoveLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function WishlistFooter() {
  return (
    <div>
      <Link
        href={'/products'}
        className={
          'bg-bg-primary mb-2.5 text-text-inverse py-3.5 px-8 flex justify-center items-center rounded-md gap-2.5 size-fit'
        }
      >
        {' '}
        <MoveLeft size={20} /> Continue Shopping
      </Link>
    </div>
  );
}
