'use client';

import Drivers from '@/components/Table/DriverTable';
import PageTitle from '@/components/Page/PageTitle';

export default function DriverPage() {
  return (
    <>
      <PageTitle pageTitle="Drivers" />
      <Drivers />
    </>
  );
}
