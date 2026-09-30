import React from 'react';

interface StyledHeadingProps {
  text: React.ReactNode;
  className?: string;
}

function HeaderTitle({ text, className = '' }: StyledHeadingProps) {
  return (
    <div className={`relative w-fit max-w-full py-2 ${className}`}>
      {/* Pill Background */}
      <div className="absolute bottom-1 inset-s-0 h-[33%] w-[72%] bg-bg-secondary-faint rounded-e-full -z-10" />

      {/* Underline */}
      <div className="absolute bottom-1 inset-s-0 h-1 w-[28%] bg-bg-secondary" />

      {/* Main Text */}
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-text-primary tracking-tight">
        {text}
      </h2>
    </div>
  );
}

export default HeaderTitle;
