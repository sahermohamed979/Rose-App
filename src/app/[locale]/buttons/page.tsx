'use client';

import { Button } from '@/shared/components/ui/button';
import React, { useState } from 'react';

export default function ButtonsPage() {
  const [isLoading, setIsLoading] = useState(false);
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000); // replace with real API call later
  }

  return (
    <main className="grow  flex items-center justify-center gap-y-5.5 flex-col">
      <div className=" flex mx-auto max-w-6xl px-4  sm:px-6 lg:px-8 ">
        <h1> Buttons components</h1>
      </div>
      <div className=" flex mx-auto max-w-6xl px-4  sm:px-6 lg:px-8  gap-x-5">
        <Button variant="default" size="default" className="">
          Primary Button
        </Button>
        <Button
          forceHover
          variant="default"
          size="default"
          className=""
        >
          Primary Hover
        </Button>
        <Button
          variant="default"
          size="default"
          disabled
          className=""
        >
          Primary Button
        </Button>
        <Button
          variant="default"
          size="default"
          className=""
          loading={true}
        >
          Primary Button
        </Button>
      </div>
      <div className=" flex mx-auto max-w-6xl px-4  sm:px-6 lg:px-8  gap-x-5">
        <Button variant="secondary" size="default" className="">
          Secondary Button
        </Button>
        <Button
          forceHover
          variant="secondary"
          size="default"
          className=""
        >
          Secondary Hover
        </Button>
        <Button
          variant="secondary"
          size="default"
          disabled
          className=""
        >
          Secondary Button
        </Button>
        <Button
          variant="secondary"
          size="default"
          className=""
          loading={true}
        >
          Secondary Button
        </Button>
      </div>
      <div className=" flex mx-auto max-w-6xl px-4  sm:px-6 lg:px-8  gap-x-5">
        <Button variant="outline" size="default" className="">
          Outline Button
        </Button>
        <Button
          forceHover
          variant="outline"
          size="default"
          className=""
        >
          Outline Hover
        </Button>
        <Button
          variant="outline"
          size="default"
          disabled
          className=""
        >
          Outline Button
        </Button>
        <Button
          variant="outline"
          size="default"
          className=""
          loading={true}
        >
          Outline Button
        </Button>
      </div>
      <div className=" flex mx-auto max-w-6xl px-4  sm:px-6 lg:px-8  gap-x-5">
        <Button variant="subtle" size="default" className="">
          Subtle Button
        </Button>
        <Button
          forceHover
          variant="subtle"
          size="default"
          className=""
        >
          Subtle Hover
        </Button>
        <Button variant="subtle" size="default" disabled className="">
          Subtle Button
        </Button>
        <Button
          variant="subtle"
          size="default"
          className=""
          loading={true}
        >
          Subtle Button
        </Button>
      </div>
      <div className=" flex mx-auto max-w-6xl px-4  sm:px-6 lg:px-8  gap-x-5">
        <Button variant="ghost" size="default" className="">
          Ghost Button
        </Button>
        <Button
          forceHover
          variant="ghost"
          size="default"
          className=""
        >
          Ghost Hover
        </Button>
        <Button variant="ghost" size="default" disabled className="">
          Ghost Button
        </Button>
        <Button
          variant="ghost"
          size="default"
          className=""
          loading={true}
        >
          Ghost Button
        </Button>
      </div>
      <div className=" flex mx-auto max-w-6xl px-4  sm:px-6 lg:px-8  gap-x-5">
        <Button variant="destructive" size="default" className="">
          Destructive Button
        </Button>
        <Button
          forceHover
          variant="destructive"
          size="default"
          className=""
        >
          Destructive Hover
        </Button>
        <Button
          variant="destructive"
          size="default"
          disabled
          className=""
        >
          Destructive Button
        </Button>
        <Button
          variant="destructive"
          size="default"
          className=""
          loading={true}
        >
          Destructive Button
        </Button>
      </div>
      <form onSubmit={handleSubmit}>
        <Button type="submit" variant="default" loading={isLoading}>
          Login
        </Button>
      </form>
    </main>
  );
}
