'use client';

import { ContextProvider } from '@/context/modalContext';

export default function CustomerTemplage({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <ContextProvider>
      {children}
      {modal}
    </ContextProvider>
  );
}
