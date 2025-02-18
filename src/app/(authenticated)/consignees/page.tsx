'use client';

import React from 'react';
import PageTitle from '@/components/Page/PageTitle';
import ShipperTable from '@/components/Table/ShipperTable';

const ShipperPage: React.FC = () => {
  return (
    <>
      <PageTitle pageTitle="Shippers" />
      <ShipperTable />
    </>
  );
};

export default ShipperPage;
