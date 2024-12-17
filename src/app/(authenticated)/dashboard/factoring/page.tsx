// Factoring Company Components Test

'use client';

import { ContextProvider } from '@/context/modalContext';
import FactoringCompany from '@/components/Table/FactoringCompany';

export default function Home() {
  return (
    <>
      <ContextProvider>
        <FactoringCompany />
      </ContextProvider>
    </>
  );
}
