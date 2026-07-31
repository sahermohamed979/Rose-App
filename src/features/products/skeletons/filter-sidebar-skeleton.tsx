export function FilterSidebarSkeleton(): React.JSX.Element {
  return (
    <div className="px-7 flex flex-col gap-4 justify-center animate-pulse">
      <div className="rounded-lg p-2 space-y-3">
        <div className="flex items-center justify-between">
          <div className="h-5 w-24 rounded bg-bg-soft" />
          <div className="h-4 w-14 rounded bg-bg-soft" />
        </div>

        <div className="space-y-2 max-h-60 overflow-hidden">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="flex h-9 w-full items-center gap-2 rounded-md bg-bg-soft/70"
            >
              <div className="h-9 w-10 rounded-l-md bg-bg-default/70" />
              <div className="h-3 w-28 rounded bg-bg-default/70" />
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border-subtle pt-3 space-y-3">
        <div className="flex items-center justify-between">
          <div className="h-5 w-24 rounded bg-bg-soft" />
          <div className="h-4 w-14 rounded bg-bg-soft" />
        </div>
        <div className="grid grid-cols-2 gap-2 max-h-62">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-19 w-full rounded-lg bg-bg-soft/70"
            />
          ))}
        </div>
      </div>

      <div className="border-t border-border-subtle pt-3 space-y-3">
        <div className="flex items-center justify-between">
          <div className="h-5 w-20 rounded bg-bg-soft" />
          <div className="h-4 w-14 rounded bg-bg-soft" />
        </div>
        <div className="flex items-center gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-6 w-6 rounded bg-bg-soft" />
          ))}
        </div>
      </div>

      <div className="border-t border-border-subtle pt-3 space-y-3">
        <div className="flex items-center justify-between">
          <div className="h-5 w-16 rounded bg-bg-soft" />
          <div className="h-4 w-10 rounded bg-bg-soft" />
        </div>
        <div className="flex gap-4">
          <div className="w-full space-y-2">
            <div className="h-4 w-10 rounded bg-bg-soft" />
            <div className="h-10 w-full rounded-md bg-bg-soft/70" />
          </div>
          <div className="w-full space-y-2">
            <div className="h-4 w-8 rounded bg-bg-soft" />
            <div className="h-10 w-full rounded-md bg-bg-soft/70" />
          </div>
        </div>
      </div>

      <div className="border-t border-border-subtle pt-3">
        <div className="h-12 w-full rounded-lg bg-bg-soft/70" />
      </div>
    </div>
  );
}
