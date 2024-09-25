'use client';

import Modal from '@ui/Modal/Modal';
import CustomerForm from '@/components/Forms/Customer/CustomerForm';

// this is an intercepting route that builds a modal

export default function UpdateCustomerReviewModal() {
  return (
    <Modal title={'Update Customer'}>
      <CustomerForm />
    </Modal>
  );
}
