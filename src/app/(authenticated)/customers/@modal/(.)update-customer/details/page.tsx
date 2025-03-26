'use client';

import Modal from '@ui/Modal/Modal';
import CustomerDetails from '@/components/Forms/Customer/CustomerDetails';

// this is an intercepting route that is shown as a modal

export default function UpdateCustomerDetailsModal() {
  return (
    <Modal title={'Update Customer'}>
      <CustomerDetails />
    </Modal>
  );
}
