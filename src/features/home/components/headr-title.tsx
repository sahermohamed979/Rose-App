import React from 'react';

interface StyledHeadingProps {
  text: string;
  className?: string;
}

const HeaderTitle: React.FC<StyledHeadingProps> = ({
  text,
  className = '',
}) => {
  return (
    <div className={`relative w-max py-2 ${className}`}>
      {/* Pill Background */}
      <div className="absolute bottom-1 h-[33%] w-[72%] bg-bg-secondary-faint rounded-r-full -z-10" />

      {/* Underline */}
      <div className="absolute bottom-1 h-1 w-[28%] bg-bg-secondary" />

      {/* Main Text */}
      <h2 className="text-4xl font-extrabold text-text-primary">
        {text}
      </h2>
    </div>
  );
};

export default HeaderTitle;
