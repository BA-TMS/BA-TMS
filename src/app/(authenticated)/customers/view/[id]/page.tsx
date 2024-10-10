'use client';

import { useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';
import FullPageFormContainer from '@/components/UI_Elements/Form/FullPageContainer';
import ViewCustomer from '@/components/Forms/Customer/ViewCustomer';
import { RootState } from '@/store/store';
import { CustomerData } from '@/types/customerTypes';

// this is an intercepting route that builds a modal
// it uses dynamic routing as we don't know what the id is
// takes in the id to find the entry

export default function ViewCustomerModal() {
  const pathname = usePathname();

  // slice the pathname to get the id
  const customerId = pathname.split('/view/')[1];

  // use the id to pull from redux
  const customer = useSelector((state: RootState) =>
    state.customers.items.find(
      (customer: CustomerData) => customer.id === customerId
    )
  );

  return (
    <FullPageFormContainer title={'View Customer'}>
      {customer ? (
        <ViewCustomer data={customer} />
      ) : (
        <p className="caption my-1 text-error-dark">Something went wrong.</p> // change to skeleton
      )}
    </FullPageFormContainer>
  );
}
