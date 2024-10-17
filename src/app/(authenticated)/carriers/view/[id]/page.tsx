'use client';

import { useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';
import FullPageFormContainer from '@/components/UI_Elements/Form/FullPageContainer';
import ViewCustomer from '@/components/Forms/Customer/ViewCustomer';
import ViewCustomerSkeleton from '@/components/Forms/Customer/ViewCustomerSkeleton';
import { RootState } from '@/store/store';
import { CustomerData } from '@/types/customerTypes';

// page uses dynamic routing as we don't know what the id is
// takes in the id to find the entry

export default function ViewCustomerPage() {
  const pathname = usePathname();

  // slice the pathname to get the id
  const carrierId = pathname.split('/view/')[1];

  // use the id to pull from redux
  //   const customer = useSelector((state: RootState) =>
  //     state.customers.items.find(
  //       (customer: CustomerData) => customer.id === customerId
  //     )
  //   );

  return (
    <FullPageFormContainer title={'View External Carrier'}>
      {/* {customer ? <ViewCustomer data={customer} /> : <ViewCustomerSkeleton />} */}
      <h1>Placeholder</h1>
    </FullPageFormContainer>
  );
}
