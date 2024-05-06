// Trailer Components Test

'use client';

import { ContextProvider } from '@/Context/modalContext';
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
