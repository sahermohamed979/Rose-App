export function CountBadge({ count }: { count: number }) {
  if (!count || count <= 0) {
    return null;
  }

  return (
    <span className="absolute -top-2 -end-2 rtl:-left-2 rtl:right-auto bg-bg-danger text-text-inverse text-[10px] font-bold min-w-4 h-4 px-0.5 flex items-center justify-center rounded-full shadow-sm pointer-events-none">
      {count > 99 ? '99+' : count}
    </span>
  );
}
