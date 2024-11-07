'use client';

import Driver from '@/components/Table/Driver';
import { ContextProvider } from '@/Context/modalContext';

export default function Drivers() {
  return (
    <ContextProvider>
      <Driver />
    </ContextProvider>
  );
}
