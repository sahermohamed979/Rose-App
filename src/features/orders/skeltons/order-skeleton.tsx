export default function OrderSkeleton() {
  return (
    <div className="flex flex-col gap-6 sm:gap-8 animate-pulse">
      {[1, 2].map((i) => (
        <article
          key={i}
          className="overflow-hidden rounded-2xl sm:rounded-3xl border border-border-muted/80 bg-card shadow-xs"
        >
          {/* Header strip */}
          <div className="flex items-center justify-between p-4 sm:px-6 sm:py-4.5 bg-bg-muted/40 border-b border-border-muted/60">
            <div className="flex items-center gap-3">
              <div className="h-6 w-24 rounded-lg bg-bg-muted" />
              <div className="h-4 w-36 rounded-md bg-bg-muted hidden sm:block" />
            </div>

            <div className="flex items-center gap-2">
              <div className="h-6 w-16 rounded-full bg-bg-muted" />
              <div className="h-6 w-20 rounded-full bg-bg-muted" />
            </div>
          </div>

          {/* Summary strip */}
          <div className="flex items-center justify-between p-4 sm:px-6 border-b border-border-muted/40">
            <div className="space-y-1.5">
              <div className="h-3 w-16 rounded bg-bg-muted" />
              <div className="h-7 w-28 rounded-md bg-bg-muted" />
            </div>

            <div className="flex items-center gap-2">
              <div className="h-7 w-20 rounded-full bg-bg-muted" />
              <div className="h-7 w-20 rounded-full bg-bg-muted" />
            </div>
          </div>

          {/* Products grid */}
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {[1, 2].map((j) => (
                <div
                  key={j}
                  className="flex gap-3 sm:gap-4 p-3 rounded-2xl border border-border-muted/70 bg-bg-muted/20"
                >
                  <div className="size-20 sm:size-22 rounded-xl bg-bg-muted shrink-0" />

                  <div className="flex flex-col justify-between flex-1 py-1">
                    <div className="space-y-2">
                      <div className="h-4 w-3/4 rounded bg-bg-muted" />
                      <div className="h-3 w-1/2 rounded bg-bg-muted" />
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="h-5 w-10 rounded bg-bg-muted" />
                      <div className="h-5 w-16 rounded bg-bg-muted" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer strip */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-bg-muted/30 border-t border-border-muted/50">
            <div className="flex items-center gap-4">
              <div className="h-4 w-28 rounded bg-bg-muted" />
              <div className="h-4 w-20 rounded bg-bg-muted" />
            </div>

            <div className="h-4 w-32 rounded bg-bg-muted" />
          </div>
        </article>
      ))}
    </div>
  );
}
