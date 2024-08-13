'use client';

import { ContextProvider } from '@/Context/modalContext';
import Load from '@/components/Table/Load';

import PageTitle from '@/components/Page/PageTitle';

const DispatchPage = () => {
  return (
    <ContextProvider>
      <PageTitle pageTitle="Dispatch Board" />
      <Load />
    </ContextProvider>
  );
};

export default DispatchPage;
