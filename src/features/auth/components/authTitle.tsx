import React from 'react';

interface AuthTitleProps {
  title: string;
  authType?: 'login' | 'register';
}

export default function AuthTitle({
  title,
  authType,
}: AuthTitleProps) {
  return (
    <div className="border-border-muted border-b pb-4 mb-6">
      {authType === 'login' ? (
        <h1 className="text-5xl font-normal text-center leading-none text-maroon-700 font-edwardian dark:text-soft-pink-300">
          {title}
        </h1>
      ) : (
        <h1 className="text-5xl font-normal text-center leading-none text-maroon-700 font-edwardian dark:text-soft-pink-300">
          {title}
        </h1>
      )}
    </div>
  );
}
