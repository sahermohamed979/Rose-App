// highlight match search result
export function highlightMatch(title: string, query: string) {
  if (!query) {
    return title;
  }

  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = title.split(new RegExp(`(${escapedQuery})`, 'gi'));

  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span key={i} className="text-base text-text-secondary">
        {part}
      </span>
    ) : (
      part
    )
  );
}
