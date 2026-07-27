'use client';

export function ReviewCardSkeleton() {
  return (
    <div className="flex gap-3 border-b border-border-subtle pb-4 last:border-none last:pb-0">
      <div className="size-9 shrink-0 rounded-full bg-bg-muted animate-pulse" />
      <div className="flex flex-1 flex-col gap-2">
        <div className="h-3.5 w-24 rounded bg-bg-muted animate-pulse" />
        <div className="h-3 w-16 rounded bg-bg-muted animate-pulse" />
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="size-3.5 rounded bg-bg-muted animate-pulse"
            />
          ))}
        </div>
        <div className="h-3 w-full rounded bg-bg-muted animate-pulse" />
        <div className="h-3 w-4/5 rounded bg-bg-muted animate-pulse" />
      </div>
    </div>
  );
}
