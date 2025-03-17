'use client';

import React from 'react';
import PageTitle from '@/components/Page/PageTitle';
import OtherNumbersForm from '@/components/Forms/OtherNumbersForm';

const OtherNumsPage: React.FC = () => {
  return (
    <>
      <PageTitle pageTitle="Other Numbers" />
      <OtherNumbersForm />
    </>
  );
};

export default OtherNumsPage;
