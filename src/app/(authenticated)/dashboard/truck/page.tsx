// Truck Components Test

'use client';

import { ContextProvider } from '@/Context/modalContext';
import Truck from '@/components/Table/Truck';

export default function Home() {
  return (
    <>
      <ContextProvider>
        <Truck />
      </ContextProvider>
    </>
  );
}
