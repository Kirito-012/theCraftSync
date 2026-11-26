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
  // Utility pages and the campaign page keep the normal system cursor (no custom cursor)
  const useNativeCursor =
    isAdminRoute ||
    !!pathname?.startsWith('/kumbh-2027') ||
    pathname === '/login' ||
    pathname === '/signup';

  // Restore the system cursor on these routes (globals.css hides it everywhere else on desktop)
  React.useEffect(() => {
    document.documentElement.classList.toggle('native-cursor', !!useNativeCursor);
    document.body.classList.toggle('native-cursor', !!useNativeCursor);
    return () => {
      document.documentElement.classList.remove('native-cursor');
      document.body.classList.remove('native-cursor');
    };
  }, [useNativeCursor]);

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
      <div
        className={`transition-opacity duration-700 ${useNativeCursor ? 'native-cursor' : ''} ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}>
        {!useNativeCursor && <CustomCursor />}
        {!isAdminRoute && <Navbar />}
        {children}
        {!isAdminRoute && <ChatBot />}
        {!isAdminRoute && <Footer />}
      </div>
    </>
  );
}
