'use client';
import { useEffect } from 'react';

export default function Page() {
  useEffect(() => {
    window.history.pushState(null, '', window.location.href);

    const handleBackButton = () => {
      window.history.pushState(null, '', window.location.href);
    };

    window.addEventListener('popstate', handleBackButton);

    const url = new URL(window.location.href);

    if (url.searchParams.has('session_id')) {
      url.searchParams.delete('session_id');
      window.history.replaceState({}, '', url.toString());
    }

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, []);

  return <div>Orders</div>;
}
