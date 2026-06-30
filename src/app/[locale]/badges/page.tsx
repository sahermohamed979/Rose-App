import { Badge } from '@/shared/components/ui/badge';
import React from 'react';

export default function badgesPage() {
  return (
    <main className="grow  flex items-center justify-center gap-y-5.5 flex-col">
      <div className=" flex mx-auto max-w-6xl px-4  sm:px-6 lg:px-8 ">
        <h1> Badges components</h1>
      </div>
      <div className=" flex mx-auto max-w-6xl px-4  sm:px-6 lg:px-8  gap-x-5">
        <Badge variant="default">Badge</Badge>
        <Badge forceHover>Badge</Badge>
      </div>
      <div className=" flex mx-auto max-w-6xl px-4  sm:px-6 lg:px-8  gap-x-5">
        <Badge variant="secondary">Badge</Badge>
        <Badge forceHover variant="secondary">
          Badge
        </Badge>
      </div>
      <div className=" flex mx-auto max-w-6xl px-4  sm:px-6 lg:px-8  gap-x-5">
        <Badge variant="subtle">Badge</Badge>
        <Badge forceHover variant="subtle">
          Badge
        </Badge>
      </div>
    </main>
  );
}
