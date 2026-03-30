'use client';

import React from 'react';
import { useLoading } from '../lib/LoadingContext';
import Loader from './Loader';
import { usePathname } from 'next/navigation';
import Navbar from './Header';
import Footer from './Footer';
import ChatBot from './ChatBot';

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  const { isLoading, setIsLoading } = useLoading();
  const pathname = usePathname();

  const isAdminRoute = pathname?.startsWith('/admin');

  // Use a 'mounted' state to avoid hydration mismatch and ensure SEO-friendly initial HTML
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isVisible = !mounted || !isLoading;

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      <div className={`transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        {!isAdminRoute && <Navbar />}
        {children}
        {!isAdminRoute && <ChatBot />}
        {!isAdminRoute && <Footer />}
      </div>
    </>
  );
}
