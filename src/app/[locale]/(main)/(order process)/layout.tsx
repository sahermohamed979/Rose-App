interface MainLayoutProps {
  children: React.ReactNode;
}
export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <main className="py-15 px-20 ">
      {/* screens */}
      <div className="grid grid-cols-12 gap-x-10">
        <div className="col-span-8 w-full ">{children}</div>

        {/* summary order */}
        <div className="col-span-4 w-full ">سشاثق</div>
      </div>
      {/* order may like */}
      <div className="mt-10 w-full ">
        <div>المنتجات التي قد تعجبك</div>
      </div>
    </main>
  );
}
