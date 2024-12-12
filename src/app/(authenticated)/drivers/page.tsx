'use client';

import Driver from '@/components/Table/Driver';
import { ContextProvider } from '@/context/modalContext';

export default function Drivers() {
  return (
    <ContextProvider>
      <Driver />
    </ContextProvider>
  );
}
