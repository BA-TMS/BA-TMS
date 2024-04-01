'use client';

import { ContextProvider } from '@/Context/modalContext';
import Load from '@/components/Table/Load';

export default function Loads() {
  return (
    <ContextProvider>
      <Load/>
    </ContextProvider>
  )
}