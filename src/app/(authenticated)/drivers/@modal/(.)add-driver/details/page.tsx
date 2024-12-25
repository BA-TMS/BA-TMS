'use client';

import Modal from '@ui/Modal/Modal';
import DriverForm from '@/components/Forms/Driver/DriverForm';

// this is an intercepting route that builds a modal

export default function AddDriverDetailsModal() {
  return (
    <Modal title={'Add Driver'}>
      <DriverForm />
    </Modal>
  );
}
