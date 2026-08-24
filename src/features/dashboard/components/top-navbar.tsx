import UserInfo from './user-info';
import Image from 'next/image';
import logo from '@/shared/assets/images/footer-logo-image.png';
import NavbarBreadcrumb from './navbar-breadcrumb';
import LangToggle from '@/shared/components/ui/langToggle';
import { ThemeToggle } from '@/shared/components/ThemeToggle';
import type { getUserProfile } from '../api/user-service';

type UserProfile = Awaited<ReturnType<typeof getUserProfile>>;

export default function TopNavbar({
  userProfile,
}: {
  userProfile: UserProfile;
}) {
  return (
    <div className=" md:py-5  w-full border-b border-border-muted  flex justify-between items-center p-1.5 relative ">
      <Image
        src={logo}
        alt="logo"
        width={60}
        height={57}
        className="md:hidden"
      />
      <NavbarBreadcrumb />
      <div className="absolute inset-e-2 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-2">
        <ThemeToggle />
        <LangToggle />
      </div>
      <div className="flex items-center gap-1 md:hidden">
        <UserInfo userProfile={userProfile} />
      </div>
    </div>
  );
}
