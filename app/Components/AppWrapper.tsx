'use client';

import React from 'react';
import { useLoading } from '../lib/LoadingContext';
import Loader from './Loader';
import { usePathname } from 'next/navigation';
import Navbar from './Header';
import Footer from './Footer';
import ChatBot from './ChatBot';
import CustomCursor from './CustomCursor';

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  const { isLoading, setIsLoading } = useLoading();
  const pathname = usePathname();

  const isAdminRoute = pathname?.startsWith('/admin');
  // Campaign page keeps the normal system cursor
  const useNativeCursor = isAdminRoute || pathname?.startsWith('/kumbh-2027');

  // Use a 'mounted' state to avoid hydration mismatch and ensure SEO-friendly initial HTML
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Campaign page opens instantly, without the intro loader
  const skipLoader = !!pathname?.startsWith('/kumbh-2027');
  React.useEffect(() => {
    if (skipLoader && isLoading) setIsLoading(false);
  }, [skipLoader, isLoading, setIsLoading]);

  const isVisible = !mounted || !isLoading || skipLoader;

  return (
    <>
      {isLoading && !skipLoader && <Loader onComplete={() => setIsLoading(false)} />}
      <div className={`transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        {!useNativeCursor && <CustomCursor />}
        {!isAdminRoute && <Navbar />}
        {children}
        {!isAdminRoute && <ChatBot />}
        {!isAdminRoute && <Footer />}
      </div>
    </>
  );
}
