'use client';

import React from 'react';
import CustomerTable from '@/components/Table/CustomerTable';
import { ContextProvider } from '@/Context/modalContext';
import PageTitle from '@/components/Page/PageTitle';

const CustomersPage: React.FC = () => {
  return (
    <ContextProvider>
      <PageTitle pageTitle="Customers" />
      <CustomerTable />
    </ContextProvider>
  );
};

export default CustomersPage;
