import Header from '@/features/home/components/header';
interface MainLayoutProps {
  children: React.ReactNode;
}
export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <main className="grow">
      <Header />
      {children}
    </main>
  );
}
