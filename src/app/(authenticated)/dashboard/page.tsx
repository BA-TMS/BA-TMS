'use client';

import { ContextProvider } from '@/context/modalContext';
import PageTitle from '@/components/Page/PageTitle';

const DashboardHome = () => {
  return (
    <ContextProvider>
      <PageTitle pageTitle="Dashboard" />
      <h3 className="pl-10 py-10">Coming Soon</h3>
    </ContextProvider>
  );
};

export default DashboardHome;
