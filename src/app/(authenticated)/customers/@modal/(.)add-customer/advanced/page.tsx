'use client';

import Modal from '@ui/Modal/Modal';
import AdvancedCustomerDetails from '@/components/Forms/Customer/CustomerAdvanced';

// this is an intercepting route that builds a modal

export default function AddCustomerAdvancedModal() {
  return (
    <Modal title={'Add Customer'}>
      <AdvancedCustomerDetails />
    </Modal>
  );
}
