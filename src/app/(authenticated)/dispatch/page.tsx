'use client';

import Load from '@/components/Table/Load';
import PageTitle from '@/components/Page/PageTitle';

const DispatchPage: React.FC = () => {
  return (
    <>
      <PageTitle pageTitle="Dispatch Board" />
      <Load />
    </>
  );
};

export default DispatchPage;
