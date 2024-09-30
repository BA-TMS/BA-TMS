'use client';

import Modal from '@ui/Modal/Modal';
import LoadForm from '@/components/Forms/LoadForm';

// this is an intercepting route that builds a modal

export default function AddLoadDetailsModal() {
  return (
    <Modal title={'Add Load'}>
      <LoadForm />
    </Modal>
  );
}
