'use client';

import React from 'react';
import TabGroupOne from '@/components/Dashboard/TabGroupOne';
import { ContextProvider } from '@/Context/modalContext';
import PageTitle from '@/components/Page/PageTitle';

const CustomersPage: React.FC = () => {
  return (
    <ContextProvider>
      <PageTitle pageTitle="Customers" />
      <TabGroupOne />
    </ContextProvider>
  );
};

export default CustomersPage;
