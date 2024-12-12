// Test page for customs broker

'use client';

import { ContextProvider } from '@/context/modalContext';
import Broker from '@/components/Table/Broker';

export default function Home() {
  return (
    <>
      <ContextProvider>
        <Broker />
      </ContextProvider>
    </>
  );
}
