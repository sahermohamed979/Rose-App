import Image from 'next/image';

import SubHeader from './sub-header';
import HeaderActions from './header-actions';
import { Link } from '@/i18n/navigation';

export default function Header() {
  return (
    <>
      <div className=" sticky top-0 z-50 ">
        <div className="  bg-bg-muted px-9 py-1  flex flex-row items-center justify-between">
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
