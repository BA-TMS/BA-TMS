'use client';

import Modal from '@ui/Modal/Modal';
import CustomerForm from '@/components/Forms/Customer/CustomerForm';

// this is an intercepting route that builds a modal

export default function AddCustomerReviewModal() {
  return (
    <Modal title={'Add Customer'}>
      <CustomerForm />
    </Modal>
  );
}
