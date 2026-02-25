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

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      <div className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}>
        {!isAdminRoute && <Navbar />}
        {children}
        {!isAdminRoute && <ChatBot />}
        {!isAdminRoute && <Footer />}
      </div>
    </>
  );
}
