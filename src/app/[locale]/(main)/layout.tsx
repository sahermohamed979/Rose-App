import React from 'react';
interface MainLayoutProps {
    children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <main className='grow flex flex-col'>

            {children}

        </main>
    );
}

