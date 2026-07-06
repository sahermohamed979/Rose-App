import Image from 'next/image';
import localFont from 'next/font/local';
import React from 'react';
import LangToggle from '@/shared/components/ui/langToggle';
import authTopSeparator from '@/shared/assets/images/auth-top-separator.png';
import authBottomSeparator from '@/shared/assets/images/auth-bottom-separator.png';
import darkAuthTopSeparator from '@/shared/assets/images/dark-auth-top-separator.png';
import darkAuthBottomSeparator from '@/shared/assets/images/dark-auth-bottom-separator.png';
import authCover from '@/shared/assets/images/auth-cover.jpg';

const edwardian = localFont({
  src: '../../../features/auth/assets/fonts/edwardianscriptitc.ttf',
  variable: '--font-edwardian',
  display: 'swap',
  weight: '400',
  style: 'normal',
  preload: false,
});

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className={`${edwardian.variable} flex min-h-screen w-full`}>
      {/* Form side */}
      <div className="flex w-full flex-col items-center justify-center bg-bg-plain px-6 py-10 sm:px-10 lg:w-1/2">
        <div className="flex justify-end items-center w-full max-w-[406px] mb-10">
          <LangToggle />
        </div>
        <div className="flex w-full max-w-[406px] flex-col items-center ">
          <Image
            src={darkAuthTopSeparator}
            alt=""
            aria-hidden
            className="h-auto w-56 select-none mb-10 text-center hidden dark:block"
          />

          <Image
            src={authTopSeparator}
            alt=""
            aria-hidden
            className="h-auto w-56 select-none mb-10 text-center dark:hidden"
          />

          <div className="w-full ">{children}</div>
          <Image
            src={darkAuthBottomSeparator}
            alt=""
            aria-hidden
            className="h-auto w-56 select-none mt-10 text-center hidden dark:block"
          />

          <Image
            src={authBottomSeparator}
            alt=""
            aria-hidden
            className="h-auto w-56 select-none mt-10 text-center dark:hidden"
          />
        </div>
      </div>

      {/* Cover side */}
      <div className="relative hidden w-1/2 bg-bg-primary lg:block">
        <Image
          src={authCover}
          alt=""
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}
