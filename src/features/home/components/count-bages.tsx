export function CountBadge({ count }: { count: number }) {
  if (!count || count <= 0) {
    return null;
  }

  return (
    <span className="absolute -top-1 -end-1.5 rtl:-left-1.5 rtl:right-auto bg-gradient-to-r from-maroon-600 to-soft-pink-600 text-white text-[10px] font-bold min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full ring-2 ring-background shadow-xs pointer-events-none animate-in zoom-in-50 duration-200">
      {count > 99 ? '99+' : count}
    </span>
  );
}
