export default function UserInfoSkeleton() {
  return (
    <div className="flex w-full min-w-0 items-center justify-between gap-2 animate-pulse">
      <div className="size-12 shrink-0 rounded-full bg-bg-soft" />
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="h-3 w-3/5 min-w-16 max-w-32 rounded bg-bg-soft" />
        <div className="h-2.5 w-4/5 min-w-24 max-w-40 rounded bg-bg-soft" />
      </div>
      <div className="size-8 shrink-0 rounded-md bg-bg-soft" />
    </div>
  );
}
