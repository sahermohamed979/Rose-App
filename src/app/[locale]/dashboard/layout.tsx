import MobileNavDashboard from '@/features/dashboard/components/mobile-nav-dashboard';
import TopNavbar from '@/features/dashboard/components/top-navbar';
import SideBarDashboard from '@/features/dashboard/components/side-bar-dashboard';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex relative h-screen overflow-hidden md:grid md:grid-cols-12 md:px-3 lg:px-4   xl:px-6.5 xl:pb-6 md:pb-3  lg:pb-5 ">
      <SideBarDashboard />

      <div className="md:col-span-9 xl:col-span-10 w-full">
        <TopNavbar />

        {children}
      </div>
      <MobileNavDashboard />
    </main>
  );
}
