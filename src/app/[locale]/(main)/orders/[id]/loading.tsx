export default function OrderDetailsLoading() {
  return (
    <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="flex items-center gap-2 mb-4">
        <div className="h-4 w-12 rounded bg-bg-muted" />
        <div className="h-4 w-2 rounded bg-bg-muted" />
        <div className="h-4 w-16 rounded bg-bg-muted" />
        <div className="h-4 w-2 rounded bg-bg-muted" />
        <div className="h-4 w-20 rounded bg-bg-muted" />
      </div>

      {/* Header Banner skeleton */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-border-muted/60">
        <div className="space-y-2">
          <div className="h-4 w-28 rounded bg-bg-muted" />
          <div className="flex items-center gap-3">
            <div className="h-8 w-44 rounded-xl bg-bg-muted" />
            <div className="h-7 w-24 rounded-lg bg-bg-muted" />
          </div>
          <div className="h-4 w-36 rounded bg-bg-muted" />
        </div>

        <div className="flex items-center gap-2">
          <div className="h-6 w-16 rounded-full bg-bg-muted" />
          <div className="h-6 w-24 rounded-full bg-bg-muted" />
        </div>
      </div>

      {/* Timeline skeleton */}
      <div className="p-6 rounded-3xl border border-border-muted/80 bg-card mb-8">
        <div className="h-4 w-32 rounded bg-bg-muted mb-6" />
        <div className="flex justify-between items-center px-4 sm:px-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="size-10 sm:size-11 rounded-full bg-bg-muted" />
              <div className="h-3 w-16 rounded bg-bg-muted" />
            </div>
          ))}
        </div>
      </div>

      {/* 2-column grid skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Items card */}
          <div className="p-6 rounded-3xl border border-border-muted/80 bg-card space-y-4">
            <div className="h-6 w-32 rounded bg-bg-muted" />
            {[1, 2].map((i) => (
              <div
                key={i}
                className="flex gap-4 pt-4 border-t border-border-muted/60"
              >
                <div className="size-20 sm:size-24 rounded-2xl bg-bg-muted shrink-0" />
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-5 w-3/4 rounded bg-bg-muted" />
                  <div className="h-4 w-1/3 rounded bg-bg-muted" />
                  <div className="h-6 w-24 rounded bg-bg-muted mt-2" />
                </div>
              </div>
            ))}
          </div>

          {/* Delivery address card */}
          <div className="p-6 rounded-3xl border border-border-muted/80 bg-card space-y-3">
            <div className="h-6 w-36 rounded bg-bg-muted" />
            <div className="h-4 w-1/2 rounded bg-bg-muted" />
            <div className="h-4 w-1/3 rounded bg-bg-muted" />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Summary card */}
          <div className="p-6 rounded-3xl border border-border-muted/80 bg-card space-y-4">
            <div className="h-6 w-32 rounded bg-bg-muted" />
            <div className="space-y-3">
              <div className="flex justify-between">
                <div className="h-4 w-16 rounded bg-bg-muted" />
                <div className="h-4 w-20 rounded bg-bg-muted" />
              </div>
              <div className="flex justify-between">
                <div className="h-4 w-16 rounded bg-bg-muted" />
                <div className="h-4 w-14 rounded bg-bg-muted" />
              </div>
              <div className="pt-3 border-t border-border-muted/60 flex justify-between">
                <div className="h-5 w-20 rounded bg-bg-muted" />
                <div className="h-7 w-28 rounded bg-bg-muted" />
              </div>
            </div>
          </div>

          {/* Payment card */}
          <div className="p-6 rounded-3xl border border-border-muted/80 bg-card space-y-3">
            <div className="h-5 w-28 rounded bg-bg-muted" />
            <div className="h-12 rounded-2xl bg-bg-muted" />
          </div>
        </div>
      </div>
    </div>
  );
}
