import React from 'react';

function NotificationCardSkeleton() {
  return (
    <div className="w-full flex flex-col px-3 py-2 border-t border-border-soft max-h-[100px] h-auto animate-pulse">
      <div className="max-w-[304px]">
        {/* Title row */}
        <div className="flex items-center justify-between mb-1.5">
          <div className="h-4 w-32 rounded bg-bg-soft" />
          <div className="h-5 w-5 rounded bg-bg-soft" />
        </div>
        {/* Message lines */}
        <div className="flex flex-col gap-1">
          <div className="h-3 w-full rounded bg-bg-soft" />
          <div className="h-3 w-4/5 rounded bg-bg-soft" />
          <div className="h-3 w-2/3 rounded bg-bg-soft" />
        </div>
      </div>
    </div>
  );
}

export default function NotificationsSkeleton() {
  return (
    <div className="flex flex-col">
      {/* Notification card skeletons */}
      {Array.from({ length: 5 }).map((_, i) => (
        <NotificationCardSkeleton key={i} />
      ))}
    </div>
  );
}
