'use client';

import React from 'react';
import PageTitle from '@/components/Page/PageTitle';
import TrailerTable from '@/components/Table/TrailerTable';

const TrailerPage: React.FC = () => {
  return (
    <>
      <PageTitle pageTitle="Trailers" />
      <TrailerTable />
    </>
  );
};

export default TrailerPage;
