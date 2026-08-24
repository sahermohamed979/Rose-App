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
] as const;

function pickColorForUser(userId: string): string {
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = (hash * 31 + userId.charCodeAt(i)) >>> 0;
  }
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

export default function AvatarFallback({
  letter,
  userId,
}: {
  letter: string;
  userId: string;
}) {
  const colorClass = pickColorForUser(userId);

  return (
    <div
      className={`flex rounded-full items-center justify-center w-full h-full text-white font-bold text-lg select-none ${colorClass}`}
    >
      {letter}
    </div>
  );
}
