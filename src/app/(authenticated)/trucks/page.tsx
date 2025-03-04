'use client';

import React from 'react';
import PageTitle from '@/components/Page/PageTitle';
import TruckTable from '@/components/Table/Truck';

const TruckPage: React.FC = () => {
  return (
    <>
      <PageTitle pageTitle="Trucks" />
      <TruckTable />
    </>
  );
};

export default TruckPage;
