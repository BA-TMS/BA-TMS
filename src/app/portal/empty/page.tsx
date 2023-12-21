'use client';

import PortalLayout from '../../components/portal/PortalLayout';
import Searchbar from '@/app/components/portal/header/Searchbar';
import Header from '@/app/components/portal/header/Header';
import TableTest from '@/app/components/table/table';

const EmptyRecieving: any = () => {
  return (
    <PortalLayout pageTitle="Empty_Recieving">
      <h1>Empty Recieving</h1>
      <TableTest />
    </PortalLayout>
  );
};

export default EmptyRecieving;
