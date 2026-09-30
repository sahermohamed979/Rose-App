import React from 'react';

interface SectionSubtitleProps {
  Text: React.ReactNode;
  className?: string;
}

function SectionSubtitle({
  Text,
  className = '',
}: SectionSubtitleProps) {
  return (
    <span
      className={`text-text-secondary font-bold tracking-[25%] text-xs sm:text-sm uppercase block mb-2 ${className}`}
    >
      {Text}
    </span>
  );
}

export default SectionSubtitle;
