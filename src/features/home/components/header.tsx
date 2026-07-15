import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import SubHeader from './sub-header';
import HeaderActions from './header-actions';

export default function Header() {
  return (
    <>
      <div className=" sticky top-0 z-50 ">
        <div className="  bg-bg-plain px-9 py-1  flex flex-row items-center justify-between">
          {/* logo image */}
          <Link href="/">
            <Image
              src="/Logo.svg"
              alt="Header Logo"
              width={85}
              height={80}
            />
          </Link>
          {/* header actions */}
          <HeaderActions />
        </div>
        {/* subHeader */}
        <SubHeader />
      </div>
    </>
  );
}
