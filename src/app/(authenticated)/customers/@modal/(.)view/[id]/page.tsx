'use client';

import { useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';
import Modal from '@ui/Modal/Modal';
import ViewCustomer from '@/components/Forms/Customer/ViewCustomer';
import ViewCustomerSkeleton from '@/components/Forms/Customer/ViewCustomerSkeleton';
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

  // const customer = undefined;

  return (
    <Modal title={'View Customer'}>
      {customer ? <ViewCustomer data={customer} /> : <ViewCustomerSkeleton />}
    </Modal>
  );
}
