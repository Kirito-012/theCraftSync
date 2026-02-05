'use client';

import React from 'react';
import { useLoading } from '../lib/LoadingContext';
import Loader from './Loader';

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  const { isLoading, setIsLoading } = useLoading();

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      <div className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}>
        {children}
      </div>
    </>
  );
}
