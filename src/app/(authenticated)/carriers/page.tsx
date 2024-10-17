'use client';

import React from 'react';
import Carriers from '@/components/Table/ExternalCarriersTable';
import PageTitle from '@/components/Page/PageTitle';

const CarrierPage: React.FC = () => {
  return (
    <>
      <PageTitle pageTitle="External Carriers" />
      <Carriers />
    </>
  );
};

export default CarrierPage;
