// For example purposes only to quickly test the componets

'use client';

import { ContextProvider } from '@/Context/modalContext';
import Carriers from '@/components/Table/Carriers';

export default function Home() {
  return (
    <>
      <ContextProvider>
        <Carriers />
      </ContextProvider>
    </>
  );
}
