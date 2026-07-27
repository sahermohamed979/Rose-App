
interface CountBadgeProps {
  count: number;
}

export function CountBadge({ count }: CountBadgeProps) {
  if (count <= 0){ return null};

  return (
    <span className="absolute -top-2 -right-2 bg-bg-danger text-text-inverse text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm">
      {count}
    </span>
  );
}