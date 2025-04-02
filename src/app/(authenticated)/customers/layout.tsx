'use client';

import { ContextProvider } from '../../../context/modalContext';

// slots are passed as props to the shared parent layout
// slots render parallel alongside children prop

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
