// Driver Components Test

'use client';

import { ContextProvider } from '@/Context/modalContext';
import Driver from '@/components/Table/Driver';

export default function Home() {
  return (
    <>
      <ContextProvider>
        <Driver />
      </ContextProvider>
    </>
  );
}
