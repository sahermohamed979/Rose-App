import Header from '@/features/home/components/header';
import Footer from '@/shared/components/footer';
interface MainLayoutProps {
  children: React.ReactNode;
}
export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <main className="grow">
      <Header />
      {children}
      <Footer />
    </main>
  );
}
