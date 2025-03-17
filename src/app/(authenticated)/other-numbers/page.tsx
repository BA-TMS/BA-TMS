'use client';

import React from 'react';
import PageTitle from '@/components/Page/PageTitle';
import OtherNumsTable from '@/components/Table/OtherNumsTable';

const OtherNumsPage: React.FC = () => {
  return (
    <>
      <PageTitle pageTitle="Other Numbers" />
      <OtherNumsTable />
    </>
  );
};

export default OtherNumsPage;
