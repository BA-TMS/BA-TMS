'use client';

import React from 'react';
import CustomerTable from '@/components/Table/CustomerTable';
import PageTitle from '@/components/Page/PageTitle';

const CustomersPage: React.FC = () => {
  return (
    <>
      <PageTitle pageTitle="Customers" />
      <CustomerTable />
    </>
  );
};

export default CustomersPage;
