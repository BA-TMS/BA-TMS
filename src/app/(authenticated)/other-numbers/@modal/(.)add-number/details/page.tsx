'use client';

import Modal from '@ui/Modal/Modal';
import OtherNumbersForm from '@/components/Forms/OtherNumbers/OtherNumbersForm';

// this is an intercepting route that builds a modal

export default function AddNumDetailsModal() {
  return (
    <Modal title={'Add Other Number'}>
      <OtherNumbersForm />
    </Modal>
  );
}
