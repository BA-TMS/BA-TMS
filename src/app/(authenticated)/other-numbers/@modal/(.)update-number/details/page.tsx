'use client';

import Modal from '@ui/Modal/Modal';
import OtherNumbersForm from '@/components/Forms/OtherNumbers/OtherNumbersForm';

// this is an intercepting route that builds a modal

export default function UpdateNumsDetailsModal() {
  return (
    <Modal title={'Update Other Number'}>
      <OtherNumbersForm />
    </Modal>
  );
}
