import MobileNavDashboard from '@/features/dashboard/components/mobile-nav-dashboard';
import TopNavbar from '@/features/dashboard/components/top-navbar';
import SideBarDashboard from '@/features/dashboard/components/side-bar-dashboard';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import UnauthorizedScreen from '@/features/dashboard/screens/unauthorized-screen';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (session?.user.role !== 'ADMIN') {
    return <UnauthorizedScreen />;
  }

  return (
      <main className="relative flex h-screen min-h-0 overflow-hidden md:grid md:grid-cols-12">
        <SideBarDashboard />

        <div className="md:col-span-9 xl:col-span-10 w-full h-full min-h-0 flex flex-col">
          <TopNavbar />

          <div className="flex-1 py-4 md:px-3 lg:px-4 xl:px-6.5 overflow-y-auto bg-bg-subtle scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {children}
          </div>

          <MobileNavDashboard />
        </div>
      </main>
  );
}
