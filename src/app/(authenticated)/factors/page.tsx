'use client';

import React from 'react';
import PageTitle from '@/components/Page/PageTitle';
import FactoringCompany from '@/components/Table/FactoringCompany';

const FactorPage: React.FC = () => {
  return (
    <>
      <PageTitle pageTitle="Factoring Company" />
      <FactoringCompany />
    </>
  );
};

export default FactorPage;
