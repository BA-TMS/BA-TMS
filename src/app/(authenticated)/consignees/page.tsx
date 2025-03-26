'use client';

import React from 'react';
import PageTitle from '@/components/Page/PageTitle';
import ConsigneeTable from '@/components/Table/ConsigneeTable';

const ConsigneePage: React.FC = () => {
  return (
    <>
      <PageTitle pageTitle="Consignees" />
      <ConsigneeTable />
    </>
  );
};

export default ConsigneePage;
