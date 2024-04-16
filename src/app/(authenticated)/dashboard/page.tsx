'use client';

import { ContextProvider } from '@/Context/modalContext';
import Load from '@/components/Table/Load';

const DashboardHome = () => {
  return (
    <ContextProvider>
      <Load />
    </ContextProvider>
  );
};

export default DashboardHome;
