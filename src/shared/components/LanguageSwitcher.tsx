'use client';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { Button } from '@/shared/components/ui/button';
import { useLocale } from 'next-intl';
import { startTransition, useEffect, useState } from 'react';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathName = usePathname();
  const locale = useLocale();

  const [searchParams, setSearchParams] = useState('');

  const language = locale === 'ar' ? 'English' : 'العربية';

  useEffect(() => {
    // setSearchParams(location.search)
    startTransition(() => setSearchParams(location.search));
  }, [searchParams]);
  return (
    <>
      <header className=" bg-gray-600 flex items-center justify-between top-0 left-0 right-0 mb-4 p-4">
        {/* <Button className="font-bold text-blue-900 hover:text-white bg-white" onClick={()=> router.replace(pathName,{locale:locale ==='ar'? 'en' :'ar'})}> {language}</Button> */}
        <Link
          href={pathName + searchParams}
          locale={locale === 'ar' ? 'en' : 'ar'}
          prefetch={false}
        >
          {language}
        </Link>
      </header>
    </>
  );
}
