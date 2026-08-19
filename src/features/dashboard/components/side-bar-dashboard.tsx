import Image from 'next/image';
import logo from '@/shared/assets/images/footer-logo-image.png';
import { Link } from '@/i18n/navigation';
import { Flower } from 'lucide-react';
import DashboardList from './dashboard-list';
import UserInfo from './user-info';
import { Suspense } from 'react';
import UserInfoSkeleton from '../skeletons/user-info-skeleton';
export default function SideBarDashboard() {
  return (
    <aside className="md:col-span-3 xl:col-span-2 hidden md:flex flex-col h-full w-full border-r">
      <div className="flex-1 min-h-0 flex flex-col gap-2 items-center md:px-2 lg:px-3 xl:px-5">
        <div className="mt-9 w-full flex flex-col items-center">
          <Image src={logo} alt="logo" width={120} height={112} />

          <Link
            href="/"
            className="bg-bg-primary-saturated rounded-[8px] mt-6 flex items-center justify-center gap-1 p-2.5 w-full text-text-inverse"
          >
            <Flower size={25} />
            Preview website
          </Link>
        </div>

        <DashboardList />
      </div>

      <div className="shrink-0 w-full md:px-1 lg:px-4 py-3">
        <Suspense fallback={<UserInfoSkeleton />}>
          <UserInfo />
        </Suspense>
      </div>
    </aside>
  );
}
