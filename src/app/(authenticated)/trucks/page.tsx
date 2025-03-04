'use client';

import React from 'react';
import PageTitle from '@/components/Page/PageTitle';
import Truck from '@/components/Table/Truck';

const TruckPage: React.FC = () => {
  return (
    <>
      <PageTitle pageTitle="Trucks" />
      <Truck />
    </>
  );
};

export default TruckPage;
