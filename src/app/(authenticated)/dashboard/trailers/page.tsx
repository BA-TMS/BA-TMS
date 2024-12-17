// Trailer Components Test

'use client';

import { ContextProvider } from '@/context/modalContext';
import Trailer from '@/components/Table/Trailer';

export default function Home() {
  return (
    <>
      <ContextProvider>
        <Trailer />
      </ContextProvider>
    </>
  );
}
