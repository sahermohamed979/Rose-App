'use client';

import { startTransition, useEffect, useState } from 'react';

const AVATAR_COLORS = [
  'bg-rose-500',
  'bg-teal-500',
  'bg-indigo-500',
  'bg-amber-500',
  'bg-cyan-500',
  'bg-purple-500',
  'bg-emerald-500',
  'bg-pink-500',
  'bg-sky-500',
  'bg-lime-600',
  'bg-fuchsia-500',
  'bg-orange-500',
];

function pickRandomColor(): string {
  return AVATAR_COLORS[
    Math.floor(Math.random() * AVATAR_COLORS.length)
  ];
}

export default function AvatarFallback({
  letter,
  userId,
}: {
  letter: string;
  userId: string;
}) {
  const [colorClass, setColorClass] = useState<string>('bg-gray-400');

  useEffect(() => {
    const key = `avatar-color-${userId}`;
    const stored = localStorage.getItem(key);
    if (stored && AVATAR_COLORS.includes(stored)) {
      startTransition(() => setColorClass(stored));
    } else {
      const picked = pickRandomColor();
      localStorage.setItem(key, picked);
      startTransition(() => setColorClass(picked));
    }
  }, [userId]);

  return (
    <div
      className={`flex rounded-full items-center justify-center w-full h-full text-white font-bold text-lg select-none ${colorClass}`}
    >
      {letter}
    </div>
  );
}
