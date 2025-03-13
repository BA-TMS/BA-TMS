'use client';

import React from 'react';
import PageTitle from '@/components/Page/PageTitle';
import Broker from '@/components/Table/Broker';

const CustomsBrokerPage: React.FC = () => {
  return (
    <>
      <PageTitle pageTitle="Customs Broker" />
      <Broker />
    </>
  );
};

export default CustomsBrokerPage;
