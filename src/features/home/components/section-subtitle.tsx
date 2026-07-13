import React from 'react';

interface SectionSubtitleProps {
  Text: React.ReactNode;
  className?: string;
}

const SectionSubtitle = ({
  Text,
  className = '',
}: SectionSubtitleProps) => {
  return (
    <span
      className={`text-text-secondary font-bold tracking-[25%] text-sm uppercase block mb-2 ${className}`}
    >
      {Text}
    </span>
  );
};

export default SectionSubtitle;
