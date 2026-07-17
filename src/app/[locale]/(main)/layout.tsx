import Header from '@/features/home/components/header';
// import Footer from '@/features/home/components/footer'; // if any
interface MainLayoutProps {
  children: React.ReactNode;
}
export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <main>
      <Header />

      {children}
    </main>
  );
}
