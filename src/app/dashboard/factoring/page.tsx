// Factoring Company Components Test

'use client';

import { ContextProvider } from '@/Context/modalContext';
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
